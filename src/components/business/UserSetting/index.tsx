"use client";

import type { OverlayPlacement } from "@heroui/aria-utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";
import { useSelector } from "react-redux";

import User from "@/components/common/User";
import { userMenuOptions } from "@/constants/setting";
import useIsClient from "@/hooks/useIsClient";
import { selectIsCollapsed } from "@/stores/setting/selectors";

import AccountHeader from "./AccountHeader";

export interface IProps {
  info?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    avatar?: string;
  };
  placement?: OverlayPlacement;
  menuOptions?: IMenuUserOption[];
}

export default function UserSetting({
  info,
  placement = "left-start",
  menuOptions = userMenuOptions,
}: IProps) {
  const isClient = useIsClient();

  const isCollapsedSideBar = useSelector(selectIsCollapsed);
  return (
    isClient && (
      <Dropdown placement={placement}>
        <DropdownTrigger>
          <div>
            <User
              shape="circle"
              onlyAvatar={isCollapsedSideBar}
              info={{
                name: info?.name,
                email: info?.email,
                avatar:
                  info?.avatar ||
                  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
              }}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          className="w-[20vw]"
          variant="faded"
          aria-label="Dropdown menu with "
        >
          <DropdownSection aria-label="Profile & Actions">
            <DropdownItem key="profile" isReadOnly>
              <AccountHeader info={info} />
            </DropdownItem>
          </DropdownSection>
          {
            menuOptions.map((item, index) => (
              <DropdownSection
                key={item.id}
                title={item.title}
                showDivider={index !== userMenuOptions.length - 1}
              >
                {item.children!.map((child) => (
                  <DropdownItem
                    key={child.id}
                    onPress={() => child.action?.()}
                    startContent={<span>{child.icon}</span>}
                  >
                    {child.title}
                  </DropdownItem>
                ))}
              </DropdownSection>
            )) as any
          }
        </DropdownMenu>
      </Dropdown>
    )
  );
}
