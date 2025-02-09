"use client";

import React from "react";

import MessageInput from "./MessageInput";

interface IProps {
  handleSendMessage: ({ content }: { content: string }) => void;
}

export default function Footer({ handleSendMessage }: IProps) {
  return (
    <div className="w-full">
      <MessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
}
