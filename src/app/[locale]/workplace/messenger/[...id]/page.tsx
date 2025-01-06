"use client";

import React from "react";

import ChatWindow from "../components/ChatWindow";

export default function page({ params }: { params: { id: string } }) {
  return <ChatWindow params={params} />;
}
