import React from "react";

import { cn } from "@/libs/utils";

interface IProps {
  length?: number;
  children: React.ReactNode;
  vertical?: boolean;
  className?: string;
}

export default function ArrayRepeater({
  length = 1,
  children,
  vertical,
  className,
}: IProps) {
  return (
    <div
      className={cn(
        "gap-5",
        vertical ? "flex flex-col" : "flex flex-row",
        className,
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  );
}
