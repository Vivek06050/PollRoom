// src/components/Login.jsx
import React, { useState } from "react";
import { User, Key } from "lucide-react";

export default function Login({ onCreateRoom, onJoinRoom }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const canCreate = name.trim().length > 0;
  const canJoin   = canCreate && code.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-8">
          
          {/* Title */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800">
            Welcome to <span className="text-indigo-600">PollRoom</span>
          </h2>

          {/* Name Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-100 rounded-full">
              <User className="text-indigo-500" size={20} />
            </div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-300
                         placeholder-gray-400 transition"
            />
          </div>

          {/* Create Poll Button */}
          <button
            onClick={() => onCreateRoom(name)}
            disabled={!canCreate}
            className={`w-full flex items-center justify-center py-3 rounded-xl text-lg font-semibold transition-transform
              ${
                canCreate
                  ? "bg-green-500 text-white hover:bg-green-600 active:scale-95 cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Create Poll
          </button>

          {/* Divider */}
          <div className="flex items-center text-gray-400">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Join Poll */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blue-100 rounded-full">
                <Key className="text-blue-500" size={20} />
              </div>
              <input
                type="text"
                placeholder="Room Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-300
                           placeholder-gray-400 transition"
              />
            </div>
            <button
              onClick={() => onJoinRoom(name, code)}
              disabled={!canJoin}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition-transform
                ${
                  canJoin
                    ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
