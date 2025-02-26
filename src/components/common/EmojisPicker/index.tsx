import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import React, { useRef } from "react";

interface IProps {
  onEmojiSelected: (emoji: EmojiClickData) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmojisPicker({
  onEmojiSelected,
  isOpen,
  setIsOpen,
}: IProps) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleBlurEmojisPicker = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!emojiPickerRef.current?.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={emojiPickerRef}
      onBlur={handleBlurEmojisPicker}
      className="absolute bottom-[115%] right-0 z-10"
    >
      <EmojiPicker
        onEmojiClick={onEmojiSelected}
        searchDisabled
        open={isOpen}
      />
    </div>
  );
}
