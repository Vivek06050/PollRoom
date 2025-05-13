import React from "react";

export default function ResultView({ userVotes, options, onBackToHome }) {
  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-green-600">🎉 Poll Results</h2>

      <div className="space-y-2">
        {Object.entries(userVotes).map(([username, optionIndex], idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
          >
            <span className="font-semibold text-gray-700">{username}</span>
            <span className="text-blue-600">{options[optionIndex] ?? "No Vote"}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onBackToHome}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
