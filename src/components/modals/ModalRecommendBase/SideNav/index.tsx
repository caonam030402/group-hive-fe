import { Button } from "@heroui/button";
import React from "react";

import { cn } from "@/libs/utils";

const listMockNav = [
  {
    id: "1",
    title: "Recommended",
  },
  {
    title: "Project Management",
  },
  {
    title: "Meeting",
  },
  {
    title: "Team Collaboration",
  },
  {
    title: "Sale",
  },
  {
    title: "Content Creation",
  },
  {
    title: "Marketing",
  },
  {
    title: "Work Planing",
  },
  {
    title: "Product",
  },
  {
    title: "Human Resource",
  },
  {
    title: "Education",
  },
  {
    title: "Personal",
  },
];

export default function SideNav() {
  return (
    <div className="flex w-1/5 flex-col gap-1 border-r p-3">
      {listMockNav.map((item) => {
        const isActive = item.id === "1";
        return (
          <Button
            variant="light"
            key={item.title}
            className={cn("w-full justify-start text-sm", {
              "bg-primary-50 text-primary": isActive,
            })}
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
}
