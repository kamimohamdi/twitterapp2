"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

// اتصال به وب‌سوکت
let socket;

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(); // اتصال به سرور WebSocket

    // دریافت پیام‌ها از سرور
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect(); // قطع اتصال در صورت تغییر صفحه
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", message); // ارسال پیام به سرور
      setMessage(""); // پاک کردن ورودی
    }
  };

  return (
    <div>
      <h1>Next.js 13 Chat with WebSocket</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
