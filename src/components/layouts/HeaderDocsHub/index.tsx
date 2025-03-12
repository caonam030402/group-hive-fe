"use client";

import { Avatar } from "@heroui/avatar";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useOthers } from "@liveblocks/react/suspense";
import {
  ChatText,
  ClockCounterClockwise,
  DotsThree,
  PushPinSimple,
  Share,
} from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

import Button from "@/components/common/Button";
import { userService } from "@/services/user";

export default function HeaderDocsHub() {
  const { user: currentUser } = userService.useProfile();
  const others = useOthers();

  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand>
        Unitized Docs <PushPinSimple className="ml-2" size={15} />
      </NavbarBrand>
      <NavbarContent justify="end">
        <div className="flex -space-x-2">
          <Avatar
            key={currentUser?.id}
            src={currentUser?.avatar}
            name={currentUser?.firstName}
            size="sm"
            className="ring-2 ring-white"
          />

          {/* Other users */}
          {others.map((other) => (
            <Avatar
              key={other.connectionId}
              src={other.presence?.user?.avatar}
              name={other.presence?.user?.name}
              size="sm"
              className="ring-2 ring-white"
            />
          ))}
        </div>
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly href="#" variant="light" size="sm">
            <ChatText size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly href="#" variant="light" size="sm">
            <ClockCounterClockwise size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly href="#" variant="light" size="sm">
            <DotsThree size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            startContent={<Share />}
            as={Link}
            color="primary"
            href="#"
            variant="solid"
            size="sm"
          >
            Share
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
