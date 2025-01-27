"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import {
  Plus,
  Presentation,
  User,
  Users,
  VideoConference,
} from "@phosphor-icons/react";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import React from "react";

import ModalAddOrganizationMember from "@/components/modals/ModalAddOrganizationMember";
import { cn } from "@/libs/utils";

interface Props {
  className?: string;
}

export default function QuickCreate({ className }: Props) {
  const {
    isOpen: isOpenModalAddExternal,
    onOpen: onOpenModalAddExternal,
    onClose: onCloseModalAddExternal,
    onOpenChange: onOpenChangeModalAddExternal,
  } = useDisclosure();

  const listQuickCreate = [
    {
      id: "1",
      name: "New Group",
      icon: <Users />,
      shortcut: "⌘C",
    },
    {
      id: "2",
      name: "Add External Contact",
      icon: <FiUser />,
      shortcut: "⌘D",
      action: () => onOpenModalAddExternal(),
    },
    {
      id: "3",
      name: "New Docs",
      icon: <User />,
      shortcut: "⌘E",
    },
    {
      id: "4",
      name: "New Video Meeting",
      icon: <Presentation />,
      shortcut: "⌘F",
    },
    {
      id: "5",
      name: "Join Video Meeting",
      icon: <VideoConference />,
      shortcut: "⌘G",
    },
  ];
  return (
    <>
      <Dropdown placement="left-start">
        <DropdownTrigger>
          <Button
            size="sm"
            isIconOnly
            className={cn("rounded-full size-2", className)}
          >
            <Plus size={18} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          {listQuickCreate.map((item) => (
            <DropdownItem
              onPress={() => item.action && item.action()}
              key={item.id}
              // shortcut={item.shortcut}
              startContent={<span>{item.icon}</span>}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <ModalAddOrganizationMember
        isOpen={isOpenModalAddExternal}
        onOpenChange={onOpenChangeModalAddExternal}
        onClose={onCloseModalAddExternal}
      />
    </>
  );
}
