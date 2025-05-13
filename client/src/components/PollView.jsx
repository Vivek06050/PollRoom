import React, { useEffect, useState, useMemo } from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PollView({ poll, onVote, onLeaveRoom }) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.floor((poll.endsAt - Date.now()) / 1000)));
  const [hasVoted, setHasVoted] = useState(false);
  const [copied, setCopied] = useState(false);

  const startTime = useMemo(() => Date.now(), []);
  const totalDuration = Math.floor((poll.endsAt - startTime) / 1000);
  const progress = Math.max(0, (timeLeft / totalDuration) * 100);

  useEffect(() => {
    if (poll.isEnded) return;
    const interval = setInterval(() => {
      const secs = Math.max(0, Math.floor((poll.endsAt - Date.now()) / 1000));
      setTimeLeft(secs);
      if (secs <= 0) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [poll.endsAt, poll.isEnded]);

  const copyCode = () => {
    navigator.clipboard.writeText(poll.roomId);
    toast.success("Copied code!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clickOption = (i) => {
    if (!hasVoted && !poll.isEnded) {
      onVote(i);
      setHasVoted(true);
    }
  };

  return (
    <div className="max-w-xl w-full space-y-6 p-6 bg-white rounded-2xl shadow-md border">
      <div className="flex items-center justify-between border p-3 bg-gray-50 rounded text-sm font-mono">
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="font-semibold">Room Code:</span>
          <span className="text-blue-600">{poll.roomId}</span>
        </div>
        <button onClick={copyCode} className="p-1 text-gray-500 hover:text-blue-600 cursor-pointer">
          <ClipboardCopy size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span role="img">✏️</span> {poll.question}
        </h2>
        <button onClick={onLeaveRoom} className="text-red-500 hover:underline cursor-pointer">
          Leave
        </button>
      </div>

      {poll.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => clickOption(i)}
          disabled={hasVoted || poll.isEnded}
          className={`w-full border rounded-xl p-4 text-left cursor-pointer ${
            hasVoted || poll.isEnded ? "bg-gray-100 text-gray-500" : "bg-white hover:bg-blue-100"
          }`}
        >
          <div className="flex justify-between">
            <span className="font-medium">{opt}</span>
            {(hasVoted || poll.isEnded) && <span className="text-sm text-gray-600">{poll.votes[i]} vote(s)</span>}
          </div>
        </button>
      ))}

      {!poll.isEnded ? (
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-blue-600 text-sm">⏳ Time left: {timeLeft}s</p>
        </div>
      ) : (
        <p className="text-center text-red-600 font-semibold">Poll Ended</p>
      )}
    </div>
  );
}
