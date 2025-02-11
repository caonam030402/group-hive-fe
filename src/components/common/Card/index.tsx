"use client";

import {
  Card as CardUI,
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps,
} from "@heroui/card";
import React, { useEffect, useRef } from "react";

import { cn } from "@/libs/utils";

interface IProps extends CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  classNames?: {
    header?: string;
    body?: string;
    footer?: string;
    base?: string;
  };
  isDecorative?: boolean;
  autoScroll?: {
    position: "top" | "bottom";
    valueChange: string;
  };
}
export default function Card({
  children,
  header,
  classNames,
  footer,
  isDecorative = true,
  autoScroll,
  ...props
}: IProps) {
  const refBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refBody.current) {
      refBody.current.scrollTop =
        autoScroll?.position === "bottom" ? refBody.current.scrollHeight : 0;
    }
  }, [autoScroll]);

  return (
    <CardUI
      classNames={{
        base: cn(
          "h-full shadow-none group",
          isDecorative && "border border-default-100",
          classNames?.base,
        ),
        body: "w-full",
      }}
      {...props}
    >
      {header && (
        <CardHeader
          className={cn("flex-col items-start p-3", classNames?.header)}
        >
          {header}
        </CardHeader>
      )}
      <div className="scroll" ref={refBody}>
        <CardBody
          className={cn(
            "size-full flex-1 py-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100    dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1",
            classNames?.body,
          )}
        >
          {children}
        </CardBody>
      </div>
      {footer && (
        <CardFooter className={classNames?.footer}>{footer}</CardFooter>
      )}
    </CardUI>
  );
}
