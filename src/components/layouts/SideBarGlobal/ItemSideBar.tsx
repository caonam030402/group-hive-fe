"use client";

import { Button } from "@heroui/button";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import { useSelector } from "react-redux";

import { usePathname } from "@/libs/i18nNavigation";
import { cn } from "@/libs/utils";
import { selectIsCollapsed } from "@/stores/setting/selectors";

import type { listSidebarItems } from "./ListItemSideBar";

type SidebarItemType = (typeof listSidebarItems)[number];

interface IItemSideBar extends SidebarItemType {
  isOpenSubMenu: boolean;
  isHasSubMenu?: boolean;
  openSubMenu: () => void;
  isParent?: boolean;
}

export default function ItemSideBar({ item }: { item: IItemSideBar }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname.includes(item.href);
  const isCollapsedSideBar = useSelector(selectIsCollapsed);
  const renderIconAccordion = () => {
    if (item.children && item.children.length > 0) {
      return (
        <div>
          <IoIosArrowDown
            className={cn(
              "transform transition-transform duration-300 rotate-0",
              {
                "rotate-180": item.isOpenSubMenu,
              },
            )}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Button
      isIconOnly={isCollapsedSideBar}
      onClick={() => {
        if (item.isHasSubMenu) {
          item.openSubMenu();
        } else {
          router.replace(item.href);
        }
      }}
      className={cn(
        "flex w-full justify-start bg-transparent hover:bg-primary-500/20 rounded-md p-2 text-sm",
        {
          "bg-white text-primary": isActive,
        },
        {
          "h-[50px]": isCollapsedSideBar,
        },
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-between gap-2 text-gray-600",
          {
            "flex-col items-center text-[10px]": isCollapsedSideBar,
          },
        )}
      >
        <div
          className={cn("flex items-center gap-2", {
            "flex-col gap-0": isCollapsedSideBar,
          })}
        >
          <span className="text-xl">
            {item.isOpenSubMenu && isCollapsedSideBar && item.isParent ? (
              <IoIosArrowDown />
            ) : (
              <span className={cn({ "text-primary": isActive })}>
                {item.icon}
              </span>
            )}
          </span>
          <span>{item.title}</span>
        </div>
        {!isCollapsedSideBar && renderIconAccordion()}
      </div>
    </Button>
  );
}
