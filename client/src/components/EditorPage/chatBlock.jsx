import React, { useState, useEffect, useRef } from "react";
import { event } from "@/services/socketEvents";

import { AnimatedList } from "../magicui/animated-list";

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
    <div className="flex flex-col h-full w-full">
      <ul
        ref={chatRef}
        className="h-[80%] w-full flex flex-col auto-cols-auto overflow-y-scroll"
      >
        {chats.map((msg, idx) => (
          <AnimatedList key={idx}>
            <li>{`${msg.name}: ${msg.message}`}</li>
          </AnimatedList>
        ))}
      </ul>

      <div className="flex w-full h-[20%] border border-dotted border-black">
        <input
          className="border-black px-3 w-[80%]"
          placeholder="Type a message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.code === "Enter" ? sendMessage() : null)}
        />
        <button type="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBlock;
