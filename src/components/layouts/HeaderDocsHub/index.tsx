"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
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

export default function HeaderDocsHub() {
  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand>
        Unitized Docs <PushPinSimple className="ml-2" size={15} />
      </NavbarBrand>
      <NavbarContent justify="end">
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
