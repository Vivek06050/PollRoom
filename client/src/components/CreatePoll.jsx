// src/components/CreatePoll.jsx
import React, { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";

export default function CreatePoll({ username, onGoBack, onCreatePoll }) {
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");

  const canStart = question.trim() && opt1.trim() && opt2.trim();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-100">
      <div className="flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6">
          
          <h2 className="text-2xl font-extrabold text-gray-800">
            👋 Hi <span className="text-indigo-600">{username}</span>, create your poll
          </h2>

          {/* Question Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
              <Pencil size={18} />
            </div>
            <input
              type="text"
              placeholder="Enter your poll question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         placeholder-gray-400 text-gray-800 transition"
            />
          </div>

          {/* Option 1 */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">1</div>
            <input
              type="text"
              placeholder="Option 1"
              value={opt1}
              onChange={(e) => setOpt1(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-green-400 
                         placeholder-gray-400 text-gray-800 transition"
            />
          </div>

          {/* Option 2 */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">2</div>
            <input
              type="text"
              placeholder="Option 2"
              value={opt2}
              onChange={(e) => setOpt2(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 
                         placeholder-gray-400 text-gray-800 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4 pt-2">
            <button
              onClick={onGoBack}
              className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold 
                         hover:bg-gray-300 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => onCreatePoll(question, opt1, opt2)}
              disabled={!canStart}
              className={`flex-1 py-3 rounded-xl font-bold transition-transform
                ${
                  canStart
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Start Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
