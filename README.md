# 🗳️ PollTime - Real-time Polling Web App

**PollTime** is a full-stack real-time polling app that allows users to create, join, and vote in live polls with a countdown timer. Built with React (Vite), Tailwind CSS, Node.js, and WebSocket.

> 🔴 Live Demo: [https://your-vercel-domain.vercel.app](https://your-vercel-domain.vercel.app)

---

## 🚀 Features

- ✅ Realtime poll creation & voting via WebSocket  
- ✅ Vote anonymously with just your name  
- ✅ Room code system to join polls  
- ✅ Countdown timer (60s) auto-ends poll  
- ✅ Live result page showing who voted what  
- ✅ Clean, responsive UI with Tailwind CSS  

---

## 🧩 Tech Stack

| Frontend            | Backend              |
|---------------------|----------------------|
| React (Vite)        | Node.js              |
| Tailwind CSS        | WebSocket (ws)       |
| React Hot Toast     | Render (hosting)     |
| React Icons + Lucide| Render (backend)     |

---

## 📁 Folder Structure

```bash
polltime/
│
├── client/           # React frontend (Vite + Tailwind)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       └── App.jsx
│
├── server/           # Node.js WebSocket backend
│   └── index.js
│
├── README.md
└── package.json
