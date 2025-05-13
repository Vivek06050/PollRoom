import { useEffect, useRef, useState } from "react";

export default function useWebSocket(url) {
  const ws = useRef(null);
  const listeners = useRef([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      listeners.current.forEach((fn) => fn(data));
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (type, payload) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    }
  };

  const addMessageListener = (fn) => {
    listeners.current.push(fn);
    return () => {
      listeners.current = listeners.current.filter((f) => f !== fn);
    };
  };

  return { isConnected, sendMessage, addMessageListener };
}
