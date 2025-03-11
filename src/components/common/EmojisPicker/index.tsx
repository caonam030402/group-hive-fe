/* eslint-disable unused-imports/no-unused-vars */
import { Button, type ButtonProps } from "@heroui/button";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import React, { useRef } from "react";

import { cn } from "@/libs/utils";

interface IProps {
  onEmojiSelected: (emoji: EmojiClickData) => void;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonTrigger?: {
    content: React.ReactNode;
    props?: ButtonProps;
  };
  place?: "topRight" | "bottomRight";
}

export default function EmojisPicker({
  onEmojiSelected,
  isOpen,
  setIsOpen,
  buttonTrigger,
  place = "bottomRight",
}: IProps) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [isOpenInLine, setIsOpenInLine] = React.useState(false);

  const handleBlurEmojisPicker = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!emojiPickerRef.current?.contains(event.relatedTarget)) {
      !setIsOpen ? setIsOpenInLine(false) : setIsOpen(false);
    }
  };

  const placeObj = {
    topRight: "bottom-[115%] right-0",
    bottomRight: "top-[115%] right-0",
  };

  return (
    <>
      {buttonTrigger && (
        <Button
          onPress={() => setIsOpenInLine(!isOpenInLine)}
          {...buttonTrigger?.props}
        >
          {buttonTrigger?.content}
        </Button>
      )}
      <div
        ref={emojiPickerRef}
        onBlur={handleBlurEmojisPicker}
        className={cn("absolute z-10", placeObj[place])}
      >
        <EmojiPicker
          onEmojiClick={onEmojiSelected}
          searchDisabled
          open={isOpen || isOpenInLine}
        />
      </div>
    </>
  );
}
