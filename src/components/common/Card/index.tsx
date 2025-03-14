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

interface CardClassNames {
  header?: string;
  body?: string;
  footer?: string;
  base?: string;
}

interface AutoScrollConfig {
  position: "top" | "bottom";
  valueChange: string;
}

interface IProps extends CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  classNames?: CardClassNames;
  isDecorative?: boolean;
  autoScroll?: AutoScrollConfig;
  isNoStyle?: boolean;
}

const getBaseClasses = (
  isDecorative: boolean,
  isNoStyle: boolean,
  baseClass?: string,
) => {
  return cn(
    "h-full shadow-none group",
    isDecorative && "border border-default-100",
    isNoStyle && "border-none shadow-none p-0 rounded-none",
    baseClass,
  );
};

const getBodyClasses = (isNoStyle: boolean, bodyClass?: string) => {
  return cn(
    "size-full flex-1 py-3",
    "[&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:bg-gray-300",
    "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
    "[&::-webkit-scrollbar-track]:rounded-full",
    "[&::-webkit-scrollbar-track]:bg-gray-100",
    "dark:[&::-webkit-scrollbar-track]:bg-neutral-700",
    "[&::-webkit-scrollbar]:w-1",
    isNoStyle && "p-0",
    bodyClass,
  );
};

export default function Card({
  children,
  header,
  classNames,
  footer,
  isDecorative = true,
  autoScroll,
  isNoStyle = false,
  ...props
}: IProps) {
  const refBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refBody.current || !autoScroll) return;

    refBody.current.scrollTop =
      autoScroll.position === "bottom" ? refBody.current.scrollHeight : 0;
  }, [autoScroll]);

  return (
    <CardUI
      classNames={{
        base: getBaseClasses(isDecorative, isNoStyle, classNames?.base),
        body: cn("w-full", isNoStyle && "p-0"),
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
      <div className="scroll h-full" ref={refBody}>
        <CardBody className={getBodyClasses(isNoStyle, classNames?.body)}>
          {children}
        </CardBody>
      </div>
      {footer && (
        <CardFooter className={classNames?.footer}>{footer}</CardFooter>
      )}
    </CardUI>
  );
}
