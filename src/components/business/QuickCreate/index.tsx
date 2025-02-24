"use client";

import { useDisclosure } from "@heroui/modal";
import {
  Presentation,
  User,
  Users,
  VideoConference,
} from "@phosphor-icons/react";
import React from "react";

import Dropdown from "@/components/common/Dropdown";
import ModalAddOrganizationMember from "@/components/modals/ModalAddOrganizationMember";

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
      <Dropdown listItem={listQuickCreate} />
      <ModalAddOrganizationMember
        isOpen={isOpenModalAddExternal}
        onOpenChange={onOpenChangeModalAddExternal}
        onClose={onCloseModalAddExternal}
      />
    </>
  );
}
