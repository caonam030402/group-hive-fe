"use client";

import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import React from "react";

import type { IProps } from ".";

export default function AccountHeader({ info }: IProps) {
  return (
    <>
      <div className="flex items-center gap-2 ">
        <Avatar
          src={
            info?.avatar || "https://i.pravatar.cc/150?u=a04258a2462d826712d"
          }
          size="md"
        />
        <div>
          <div className="text-base font-bold">{info?.email}</div>
          <div className="text-tiny">Administrator</div>
        </div>
      </div>

      <Input
        className="mt-3"
        placeholder="Say some thing about yourself..."
        size="sm"
      />
    </>
  );
}
