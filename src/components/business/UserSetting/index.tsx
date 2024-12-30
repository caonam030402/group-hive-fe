"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

import User from "@/components/common/User";
import { userMenuOptions } from "@/constants/setting";
import { selectIsCollapsed } from "@/stores/setting/selectors";

import AccountHeader from "./AccountHeader";

export default function UserSetting() {
  const isCollapsedSideBar = useSelector(selectIsCollapsed);
  return (
    <Dropdown placement="left-start">
      <DropdownTrigger>
        <div>
          <User
            shape="circle"
            onlyAvatar={isCollapsedSideBar}
            info={{
              name: "John Doe",
              email: "9M8Hh@example.com",
              avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
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
            <AccountHeader />
          </DropdownItem>
        </DropdownSection>
        {
          userMenuOptions.map((item, index) => (
            <DropdownSection
              key={item.id}
              title={item.title}
              showDivider={index !== userMenuOptions.length - 1}
            >
              {item.children.map((child) => (
                <DropdownItem
                  key={child.id}
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
  );
}
