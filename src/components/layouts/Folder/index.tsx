"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/react";
import { GoogleDriveLogo, House, MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

import { cn } from "@/libs/utils";

const listDrives = [
  {
    title: "Home",
    icon: <House size={20} />,
  },
  {
    title: "Drive",
    icon: <GoogleDriveLogo size={20} />,
  },
];
export default function Folder() {
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
          const isActive = item.title === "Home";
          return (
            <Button
              size="sm"
              variant="light"
              className={cn(
                "flex w-full text-sm items-center justify-start gap-1",
                {
                  "bg-primary-100 text-primary": isActive,
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
        <Accordion>
          <AccordionItem
            key="1"
            classNames={{ title: "text-xs", indicator: "text-xs" }}
            aria-label="Accordion 1"
            title="Pinned"
          >
            Pinned
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
