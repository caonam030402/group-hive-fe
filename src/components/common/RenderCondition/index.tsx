import React from "react";

import { cn } from "@/libs/utils";

interface IProps {
  condition?: boolean;
  ifContent?: React.ReactNode;
  elseContent?: React.ReactNode;
  keepAlive?: boolean;
}

export default function RenderCondition({
  condition,
  elseContent,
  ifContent,
  keepAlive,
}: IProps) {
  if (keepAlive) {
    return (
      <>
        <div className={cn(condition ? "block" : "hidden", "w-full h-full")}>
          {ifContent}
        </div>
        <div className={cn(!condition ? "block" : "hidden", "w-full h-full")}>
          {elseContent}
        </div>
      </>
    );
  }
  return condition ? ifContent : elseContent;
}
