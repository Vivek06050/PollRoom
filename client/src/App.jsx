import React, { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import useWebSocket from "./hooks/useWebSocket";
import Header from "./components/Header";
import Login from "./components/Login";
import CreatePoll from "./components/CreatePoll";
import PollCreated from "./components/PollCreated";
import PollView from "./components/PollView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);
  const [poll, setPoll] = useState(null);
  const [roomId, setRoomId] = useState("");

  const { isConnected, sendMessage, addMessageListener } = useWebSocket(
    "wss://pollroom.onrender.com"
  );

  useEffect(() => {
    const cleanup = addMessageListener((msg) => {
      switch (msg.type) {
        case "error":
          toast.error(msg.payload.error);
          break;

        case "room_created":
          setRoomId(msg.payload.roomId);
          setView("created");
          break;

        case "poll_details":
          setPoll({
            roomId: msg.payload.roomId,
            question: msg.payload.question,
            options: msg.payload.options,
            votes: msg.payload.votes,
            totalVotes: msg.payload.totalVotes,
            isEnded: msg.payload.isEnded,
            endsAt: msg.payload.endsAt,
          });
          setView("view");
          break;

        case "vote_update":
          setPoll((prev) =>
            prev && {
              ...prev,
              votes: msg.payload.votes,
              totalVotes: msg.payload.totalVotes,
            }
          );
          break;

        case "timer_end":
          setPoll((prev) => prev && { ...prev, isEnded: true });
          toast("⏰ Poll has ended. No more votes can be accepted.");
          break;
      }
    });
    return cleanup;
  }, [addMessageListener]);

  const handleCreateRoom = useCallback((name) => {
    if (!name.trim()) {
      toast.error("Please enter your name before creating a poll.");
      return;
    }
    setUser({ name });
    setView("create");
  }, []);

  const handleJoinRoom = useCallback(
    (name, code) => {
      if (!name.trim() || !code.trim()) {
        toast.error("Please enter both your name and a room code.");
        return;
      }
      if (!isConnected) {
        toast.error("Not connected to server. Please try again.");
        return;
      }
      setUser({ name });
      sendMessage("join_room", { roomId: code, userName: name });
    },
    [isConnected, sendMessage]
  );

  const handleStartPoll = useCallback(
    (question, opt1, opt2) => {
      if (!question.trim() || !opt1.trim() || !opt2.trim()) {
        toast.error("Please fill question and both options.");
        return;
      }
      if (!isConnected) {
        toast.error("WebSocket not connected. Please wait or reload.");
        return;
      }
      sendMessage("create_poll", {
        userName: user.name,
        question,
        options: [opt1, opt2],
      });
    },
    [isConnected, sendMessage, user]
  );

  const handleEnterRoom = useCallback(() => {
    if (!isConnected) {
      toast.error("Not connected to server.");
      return;
    }
    if (!user || !roomId) {
      toast.error("Missing user or room code.");
      return;
    }
    // if we're already the creator (poll exists), skip re-join:
    if (poll) {
      setView("view");
      return;
    }
    sendMessage("join_room", { roomId, userName: user.name });
  }, [isConnected, user, roomId, poll, sendMessage]);

  const handleVote = useCallback(
    (optionIndex) => {
      if (!isConnected || !poll || !user) {
        toast.error("Cannot vote right now.");
        return;
      }
      sendMessage("vote", {
        roomId: poll.roomId,
        userName: user.name,
        option: optionIndex,
      });
    },
    [isConnected, poll, sendMessage, user]
  );

  const handleLeave = useCallback(() => {
    setView("login");
    setPoll(null);
    setRoomId("");
    setUser(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} />
      <main className="flex-grow flex items-center justify-center p-4">
        {view === "login" && (
          <Login onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
        )}
        {view === "create" && user && (
          <CreatePoll
            username={user.name}
            onGoBack={handleLeave}
            onCreatePoll={handleStartPoll}
          />
        )}
        {view === "created" && (
          <PollCreated roomId={roomId} onEnterRoom={handleEnterRoom} />
        )}
        {view === "view" && poll && (
          <PollView poll={poll} onVote={handleVote} onLeaveRoom={handleLeave} />
        )}
      </main>
     
      
     {/* <-- Place this once, at the root of your component tree */}
     <ToastContainer
       position="top-right"
       autoClose={1500}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       pauseOnHover
       draggable
     />
      <Toaster position="top-center" />
    </div>
  );
}
