"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import {
  Plus,
  Presentation,
  User,
  Users,
  VideoConference,
} from "@phosphor-icons/react";
import React from "react";

import Dropdown from "@/components/common/Dropdown";
import ModalAddOrganizationMember from "@/components/modals/ModalAddOrganizationMember";
import { cn } from "@/libs/utils";

export default function QuickCreate() {
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
      action: () => null,
    },
    {
      id: "2",
      name: "Add External Contact",
      icon: <Users />,
      action: () => onOpenModalAddExternal(),
    },
    {
      id: "3",
      name: "New Docs",
      icon: <User />,
      action: () => null,
    },
    {
      id: "4",
      name: "New Video Meeting",
      icon: <Presentation />,
      action: () => null,
    },
    {
      id: "5",
      name: "Join Video Meeting",
      icon: <VideoConference />,
      action: () => null,
    },
  ];
  return (
    <>
      <Dropdown
        trigger={
          <Button size="sm" isIconOnly className={cn("rounded-full size-2")}>
            <Plus size={18} />
          </Button>
        }
        listItem={listQuickCreate}
      />
      <ModalAddOrganizationMember
        isOpen={isOpenModalAddExternal}
        onOpenChange={onOpenChangeModalAddExternal}
        onClose={onCloseModalAddExternal}
      />
    </>
  );
}
