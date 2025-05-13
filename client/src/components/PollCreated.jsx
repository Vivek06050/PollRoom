import React, { useState } from "react";
import toast from "react-hot-toast";

export default function PollCreated({ roomId, onEnterRoom }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopied(true);
      toast.success("Room code copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center mx-auto">
      {/* Success badge */}
      <div className="text-5xl">✅</div>
      <h2 className="text-2xl font-extrabold text-gray-800">Poll Created!</h2>

      {/* Room code and copy button */}
      <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2 space-x-2">
        <span className="font-mono text-2xl tracking-wide">{roomId}</span>
        <button
          onClick={copyCode}
          className={`p-1 rounded transition ${
            copied ? "bg-green-200" : "hover:bg-gray-200"
          } cursor-pointer`}
        >
          {/* Clipboard emoji */}
          📋
        </button>
      </div>

      {/* Enter button */}
      <button
        onClick={onEnterRoom}
        className="w-full mt-4 py-3 rounded-lg bg-blue-600 text-white font-semibold 
                   hover:bg-blue-700 hover:scale-105 transition-transform shadow cursor-pointer"
      >
        Enter Poll Room
      </button>
    </div>
  );
}
