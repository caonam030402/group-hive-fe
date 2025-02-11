/* eslint-disable @typescript-eslint/no-use-before-define */
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState } from "react";

import { cn } from "@/libs/utils";
import { isEmpty } from "@/utils/common";

import UtilityBar from "./UtilityBar";

interface IProps {
  handleSendMessage: ({ content }: { content: string }) => void;
}

export default function MessageInput({ handleSendMessage }: IProps) {
  const [openEmojis, setOpenEmojis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Send a message…",
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              const content = this.editor.getHTML();

              !isEmpty(content) && handleSendMessage({ content });
              this.editor.commands.clearContent();
              return true;
            },
          };
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none focus:ring-0",
        style: "word-break: break-word; overflow-wrap: break-word;",
      },
    },
  });

  const isOneLine = ref.current?.offsetHeight;

  const handleBlurEmojisPicker = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!emojiPickerRef.current?.contains(event.relatedTarget)) {
      setOpenEmojis(false);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center rounded-md bg-gray-100 px-3 py-1 hover:bg-gray-200 gap-3 relative",
      )}
      style={{
        alignItems: isOneLine ? "center" : "flex-start",
      }}
    >
      <EditorContent
        ref={ref}
        className="min-w-0 flex-1"
        editor={editor}
        style={{ flex: "1 1 auto" }}
      />

      <div className="mt-2 self-end ">
        <UtilityBar setOpenEmojis={setOpenEmojis} />
      </div>

      <div
        ref={emojiPickerRef}
        onBlur={handleBlurEmojisPicker}
        className="absolute bottom-[115%] right-0 z-10"
      >
        <EmojiPicker
          onEmojiClick={(icon) => {
            editor!.commands.insertContent(icon.emoji);
          }}
          searchDisabled
          open={openEmojis}
        />
      </div>
    </div>
  );
}
