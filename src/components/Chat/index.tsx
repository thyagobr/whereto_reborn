"use client";

import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { useCreateChatMessage } from "@/hooks/chats/useCreateChatMessage";
import { useGetChat } from "@/hooks/chats/useGetChat";
import { useState } from "react";
import { useUser } from "@/hooks/users/useUser";

export const Chat = ({ chatableId, chatableType }) => {

  const { chat, mutate } = useGetChat({ chatableId, chatableType });
  const { trigger: chatMessageTrigger } = useCreateChatMessage({ chatableId, chatableType });
  const { user } = useUser();

  const [message, setMessage] = useState("");

  const saveMessage = async () => {
    const payload = {
      userId: user.id,
      content: message
    };

    await chatMessageTrigger(payload);
    setMessage("");
    mutate();
  }

  const saveOnEnter = async (e) => {
    if (e.key === "Enter") {
      await saveMessage();
    }
  }

  return (
    <div className="w-full max-w-[450px] mx-auto mt-5">
      <hr className="border-white-800 my-5" />
      {((user?.role === "standard_user") || (user?.role === "admin")) && (
        <div className="w-full max-w-[450px] mx-auto my-5">
          <input
            type="text"
            className="w-full border-2 border-white-800 rounded-md p-2"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={saveOnEnter}
            placeholder="Type a message..." />
          <Button
            className="w-full rounded my-3"
            onClick={async () => await saveMessage()}
          >Send</Button>
        </div>)}
      {!chat || chat.messages.length === 0 && (
        <div className="w-full text-center">
          <p>No messages yet</p>
        </div>
      )}
      {chat && chat.messages.map((message, index) => (
        <ChatBubble
          key={index}
          user={user}
          message={message}
        />
      ))}
    </div>
  );
}
