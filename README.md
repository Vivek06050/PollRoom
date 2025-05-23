**# 🗳️ PollRoom - Real-time Polling Web App**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Render](https://img.shields.io/badge/Deploy%20Frontend-Render-00D8FF.svg)](https://render.com) [![Render](https://img.shields.io/badge/Deploy%20Backend-Render-00D8FF.svg)](https://render.com) [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://pollroom-1.onrender.com/)

**PollRoom** is a full-stack, real-time polling application that enables users to create, join, and vote in live polls. Featuring a countdown timer, anonymous voting by name, and live results display, PollRoom ensures interactive and engaging polls.

🔴 **Live Demo:** [https://pollroom-1.onrender.com/](https://pollroom-1.onrender.com/)

---

## 🚀 Features

* **Realtime Polling** via WebSocket
* **Anonymous Voting** with custom username
* **Room Code System** to join polls
* **Countdown Timer** (default 60s) auto-ends polls
* **Responsive UI** built with Tailwind CSS

---

## 🧩 Tech Stack

| Frontend        | Backend          |
| --------------- | ---------------- |
| React (Vite)    | Node.js          |
| Tailwind CSS    | WebSocket (ws)   |
| React Hot Toast | Render (hosting) |

---

## 📁 Project Structure

```bash
PollRoom/
│
├── client/           # React frontend (Vite + Tailwind)
│   ├── public/
│   │  
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       └── App.jsx        # Main application file
│
├── server/           # Node.js WebSocket backend
│   └── index.js
│
├── README.md         # Project documentation
└── package.json       # Monorepo dependencies
```

---

## 📸 Screenshots

Login Page

![Login Page](client/public/Login.png)

Create Poll

![Create Poll](client/public/create-poll.png)


Room Code

![Create Poll](client/public/Room-Code.png)

Poll View

![Poll View](client/public/Live-Poll.png)


---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vivek06050/PollRoom.git
cd PollRoom
```

### 2. Run Locally

#### Backend (Node.js WebSocket)

```bash
cd server
npm install
node index.js       # Runs on ws://localhost:3001
```

#### Frontend (React + Vite)

```bash
cd client
npm install
npm run dev         # Runs on http://localhost:5173
```

🔗 **WebSocket Configuration**

```js
// In client/src/App.jsx
const WS_URL = window.location.hostname === 'localhost'
  ? 'ws://localhost:3001'
  : 'wss://pollroom.onrender.com';
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
