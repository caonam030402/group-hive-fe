import {
  AddressBookTabs,
  CalendarDots,
  ChatCenteredDots,
  FileText,
  SquaresFour,
  VideoConference,
} from "@phosphor-icons/react";
import React from "react";

import { PATH } from "@/constants";

import SectionSideBar from "./SectionSideBar";

export const listSidebarItems = [
  {
    id: "1",
    title: "Messages",
    href: "/workplace/messenger",
    icon: <ChatCenteredDots size={20} weight="fill" />,
    children: [],
  },
  {
    id: "2",
    title: "Meetings",
    href: "/workplace/meetings",
    icon: <VideoConference size={20} weight="fill" />,
    children: [],
  },
  {
    id: "3",
    title: "Calendar",
    href: "/workplace/groups",
    icon: <CalendarDots size={20} weight="fill" />,
    children: [],
  },
  {
    id: "4",
    title: "Docs",
    href: PATH.BASE_HOME,
    icon: <FileText size={20} weight="fill" />,
    children: [],
  },
  {
    id: "6",
    title: "Contact",
    href: "/workplace/settings",
    icon: <AddressBookTabs size={20} weight="fill" />,
    children: [],
  },
  {
    id: "8",
    title: "Workplace",
    href: "/workplace/settings",
    icon: <SquaresFour size={22} weight="fill" />,
    children: [
      {
        id: "5",
        title: "Contacts",
        href: "workplace/settings",
        icon: <SquaresFour size={20} weight="fill" />,
        children: [],
      },
      {
        id: "6",
        title: "Favor",
        href: "/workplace/settings",
        icon: <SquaresFour size={20} weight="fill" />,
        children: [],
      },
    ],
  },
];

export default function ListItemSideBar() {
  return (
    <div className="w-full space-y-2">
      {listSidebarItems.map((item) => (
        <SectionSideBar key={item.id} item={item} />
      ))}
    </div>
  );
}
