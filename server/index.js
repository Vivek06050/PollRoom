const WebSocket = require("ws");
const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT }, () =>
  console.log(`WebSocket server on ws://localhost:${PORT}`)
);

const rooms = {};

function broadcast(roomId, message) {
  const room = rooms[roomId];
  if (!room) return;
  const data = JSON.stringify(message);
  room.clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(data);
  });
}

function createRoom({ userName, question, options }, ws) {
  const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
  const endsAt = Date.now() + 60_000;
  rooms[roomId] = {
    question,
    options,
    votes: [0, 0],
    users: [userName],
    userVotes: { [userName]: null },
    clients: [ws],
    endsAt,
    isEnded: false,
    timeoutHandle: setTimeout(() => {
      rooms[roomId].isEnded = true;
      broadcast(roomId, { type: "timer_end" });
      delete rooms[roomId];
    }, 60_000),
  };
  ws.roomId = roomId;
  ws.userName = userName;
  ws.send(
    JSON.stringify({ type: "room_created", payload: { roomId } })
  );
}

function joinRoom({ roomId, userName }, ws) {
  const room = rooms[roomId];
  if (!room) return ws.send(JSON.stringify({ type: "error", payload: { error: "Room not found." } }));
  if (!room.users.includes(userName)) {
    room.users.push(userName);
    room.userVotes[userName] = null;
  }
  room.clients.push(ws);
  ws.roomId = roomId;
  ws.userName = userName;
  ws.send(
    JSON.stringify({
      type: "poll_details",
      payload: {
        roomId,
        question: room.question,
        options: room.options,
        votes: room.votes,
        totalVotes: room.votes.reduce((a, b) => a + b, 0),
        isEnded: room.isEnded,
        endsAt: room.endsAt,
      },
    })
  );
}

function handleVote({ roomId, userName, option }, ws) {
  const room = rooms[roomId];
  if (!room) return ws.send(JSON.stringify({ type: "error", payload: { error: "Room not found." } }));
  if (room.isEnded) return ws.send(JSON.stringify({ type: "error", payload: { error: "Poll has ended." } }));
  if (room.userVotes[userName] !== null) return ws.send(JSON.stringify({ type: "error", payload: { error: "Already voted." } }));
  room.votes[option]++;
  room.userVotes[userName] = option;
  broadcast(roomId, {
    type: "vote_update",
    payload: {
      votes: room.votes,
      totalVotes: room.votes.reduce((a, b) => a + b, 0),
    },
  });
}

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return ws.send(JSON.stringify({ type: "error", payload: { error: "Invalid JSON" } })); }
    const { type, payload } = msg;
    if (type === "create_poll") createRoom(payload, ws);
    else if (type === "join_room") joinRoom(payload, ws);
    else if (type === "vote") handleVote(payload, ws);
    else ws.send(JSON.stringify({ type: "error", payload: { error: "Unknown type" } }));
  });
  ws.on("close", () => {
    const { roomId, userName } = ws;
    const room = rooms[roomId];
    if (room) {
      room.clients = room.clients.filter((c) => c !== ws);
      if (room.clients.length === 0 && room.isEnded) {
        clearTimeout(room.timeoutHandle);
        delete rooms[roomId];
      }
    }
  });
});
