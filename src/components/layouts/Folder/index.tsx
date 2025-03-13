"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/react";
import {
  FolderOpen,
  FolderSimpleUser,
  House,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

import { iconPath } from "@/constants/icons";
import useJump from "@/hooks/useJump";
import { cn } from "@/libs/utils";

const listDrives = [
  {
    title: "Workspace",
    icon: <House size={20} />,
    link: "/workplace/base/home",
  },
  {
    title: "My Drive",
    icon: <FolderSimpleUser size={20} />,
    link: "/workplace/base/my-drive",
  },
  {
    title: "Shared With Me",
    icon: <FolderOpen size={20} />,
    link: "/workplace/base/shared-with-me",
  },
  // {
  //   title: "Drive",
  //   icon: <GoogleDriveLogo size={20} />,
  //   link: "/workplace/base/drive",
  // },
];

const listPin = [
  {
    id: 1,
    title: "Getting Started with Lark Docs",
    icon: iconPath.doc_regular,
  },
  { id: 2, title: "Lark Docs Tutorial", icon: iconPath.slide_regular },
  {
    id: 3,
    title: "Lark Docs API Reference",
    icon: iconPath.form_regular,
  },
];
export default function Folder() {
  const { handleJump, isActive } = useJump();

  return (
    <div className="px-3">
      <div className="mb-2 font-bold">Lark docs</div>
      <Input
        size="sm"
        startContent={<MagnifyingGlass size={15} />}
        placeholder="Search"
      />
      <div className="mt-3 flex flex-col gap-2">
        {listDrives.map((item) => {
          return (
            <Button
              onPress={() => handleJump({ url: item.link })}
              size="sm"
              variant="light"
              className={cn(
                "flex w-full text-sm items-center justify-start gap-1",
                {
                  "bg-primary-100 text-primary": isActive({ url: item.link }),
                },
              )}
              key={item.title}
            >
              {item.icon} {item.title}
            </Button>
          );
        })}
      </div>
      <div>
        <Accordion defaultExpandedKeys="1">
          <AccordionItem
            key="1"
            classNames={{
              title: "text-xs",
              indicator: "text-xs",
              trigger: "pb-1",
            }}
            aria-label="Pin"
            title="Pinned"
          >
            <div className="flex flex-col gap-4 ">
              {listPin.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 pl-3 text-xs"
                  >
                    <Image
                      className="color-contract-light"
                      width={18}
                      height={18}
                      src={item.icon}
                      alt="icon"
                    />
                    <div className="text-sm opacity-85">{item.title}</div>
                  </div>
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
