import {
  Card as CardUI,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/card";
import React from "react";

import { cn } from "@/libs/utils";

interface IProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  classNames?: {
    header?: string;
    body?: string;
    footer?: string;
  };
}
export default function Card({ children, header, classNames, footer }: IProps) {
  return (
    <CardUI
      classNames={{
        base: "h-full shadow-none border border-default-100 group",
        body: "w-full",
      }}
    >
      {header && (
        <CardHeader
          className={cn("flex-col items-start p-3", classNames?.header)}
        >
          {header}
        </CardHeader>
      )}
      <CardBody
        className={cn(
          "size-full flex-1 scroll py-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100    dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1",
          classNames?.body,
        )}
      >
        {children}
      </CardBody>
      {footer && (
        <CardFooter className={classNames?.footer}>{footer}</CardFooter>
      )}
    </CardUI>
  );
}
