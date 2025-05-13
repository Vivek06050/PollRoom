import React from "react";
import { UserCircle } from "lucide-react"; // or swap in any icon library

export default function Header({ user }) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md backdrop-blur-sm">
      {/* Logo + Title */}
      <div className="flex items-center space-x-2">
        {/* Placeholder icon */}
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          {/* Swap this for your logo SVG */}
          <span className="text-lg font-bold">⏱️</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          PollRoom
        </h1>
      </div>

      {/* User greeting */}
      {user && (
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          {/* Optional avatar */}
          <UserCircle className="w-6 h-6 text-white/90" />

          <span className="text-sm sm:text-base">
            Hello, <span className="font-semibold">{user.name}</span>
          </span>
        </div>
      )}
    </header>
  );
}
