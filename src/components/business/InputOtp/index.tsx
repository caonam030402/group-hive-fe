"use client";

import { Input } from "@heroui/input";
import React, { useRef, useState } from "react";

interface IProps {
  length?: number;
  onComplete: (pin: string) => void;
}

export default function InputOTP({ length = 6, onComplete }: IProps) {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
  };

  // const disabled = (index: number) => {
  //   return OTP[index - 1] === "";
  // };

  return (
    <div className="mt-4 flex justify-between">
      {Array(length)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="size-14">
              <Input
                ref={function refUseInput(ref) {
                  inputRef.current[index] = ref as HTMLInputElement;
                }}
                // disabled={disabled(index)}
                value={OTP[index]}
                onChange={(e) =>
                  handleTextChange(e.target.value.replace(/\D/g, ""), index)
                }
                maxLength={1}
                variant="faded"
                min={0}
                classNames={{
                  inputWrapper: "h-full placeholder:text-[50px]",
                  base: "h-full",
                  input: "text-2xl text-center ",
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
