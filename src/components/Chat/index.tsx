"use client";

import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { useCreateChatMessage } from "@/hooks/chats/useCreateChatMessage";
import { useState } from "react";

export const Chat = ({ chateableId, chateableType }) => {

  const { trigger: chatMessageTrigger } = useCreateChatMessage({ chateableId, chateableType });

  const [message, setMessage] = useState("");

  const saveMessage = () => {
    debugger
    const payload = {
      userId: 1,
      message: message
    };

    chatMessageTrigger(payload);
    setMessage("");
  }

  const messages = [
    {
      username: "Thyago",
      message: "Hello",
      time: "12:00",
    },
    {
      username: "Jane Doe",
      message: "Hi",
      time: "12:01",
    },
  ];

  return (
    <div className="w-full max-w-[450px] mx-auto mt-5">
      <div className="w-full text-center">
        <h1>Chat</h1>
      </div>
      <hr className="border-white-800 my-5" />
      <div className="w-full max-w-[450px] mx-auto my-5">
        <input
          type="text"
          className="w-full border-2 border-white-800 rounded-md p-2"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type a message..." />
        <Button
          className="w-full rounded"
          onClick={() => saveMessage()}
        >Send</Button>
      </div>
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          me={message.username === "Thyago"}
          username={message.username}
          message={message.message}
          time={message.time}
        />
      ))}
    </div>
  );
}
