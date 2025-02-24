"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

export default function Doc() {
  const editor = useCreateBlockNote();
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="max-w-[55vw]">
        <div className="px-14">
          <input
            className="bg-white text-4xl font-bold focus:outline-none"
            placeholder="Enter title here"
          />
        </div>
        <BlockNoteView className="h-full" editor={editor} />
      </div>
    </div>
  );
}
