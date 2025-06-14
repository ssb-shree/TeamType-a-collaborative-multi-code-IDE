import React, { useState, useEffect, useRef } from "react";
import { event } from "@/services/socketEvents";

import { AnimatedList } from "../magicui/animated-list";
import { Input } from "../ui/input";

const ChatBlock = ({ socket, authData, projectData }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      setChats((prevChats) => [...prevChats, data]);
    };

    socket.on(event.receiveMessage, handleMessage);

    return () => {
      socket.off(event.receiveMessage, handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit(event.sendMessage, {
      name: authData.name,
      projectID: projectData._id,
      message,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full min-w-[200px]">
      <ul
        ref={chatRef}
        className="h-[80%] w-full flex flex-col auto-cols-auto overflow-y-scroll px-4"
      >
        {chats.map((msg, idx) => (
          <AnimatedList key={idx}>
            <li className="bg-slate-800/60 border text-wrap border-slate-700 rounded-xl px-4 py-2 my-2 shadow-md text-white backdrop-blur-sm">
              <p className="text-sm font-semibold text-blue-400">{msg.name}</p>
              <p className="text-base">{msg.message}</p>
            </li>
          </AnimatedList>
        ))}
      </ul>
      <div className="flex w-full h-[20%] items-center gap-2 px-4 py-2 mb-2 backdrop-blur-md shadow-inner">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.code === "Enter" ? sendMessage() : null)}
          className="flex-1 bg-transparent border-2 rounded-2xl border-slate-400 focus-visible:border-white text-lg text-white placeholder:text-slate-300 p-3 outline-none focus-visible:ring-0 transition-all"
        />
        <button
          type="button"
          onClick={sendMessage}
          className=" bg-cyan-300 text-black font-semibold px-4 py-2 rounded-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBlock;
