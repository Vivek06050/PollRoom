import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 p-4 text-center">
      &copy; {new Date().getFullYear()} PollTime. All rights reserved.
    </footer>
  );
}
