import {
  Dropdown as DropdownComponent,
  DropdownItem,
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownProps,
  DropdownTrigger,
  type DropdownTriggerProps,
} from "@heroui/dropdown";
import React from "react";

import type { IItemDropDown } from "@/types/common";

interface IProps {
  listItem: IItemDropDown[];
  props?: Omit<DropdownProps, "children">;
  propsMenu?: DropdownMenuProps;
  propsTrigger?: DropdownTriggerProps;
  trigger: React.ReactNode;
}

export default function Dropdown({
  listItem,
  props,
  propsMenu,
  propsTrigger,
  trigger,
}: IProps) {
  return (
    <DropdownComponent placement="left-start" {...props}>
      <DropdownTrigger {...propsTrigger}>{trigger}</DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Dropdown menu with description"
        {...propsMenu}
      >
        {listItem.map((item) => (
          <DropdownItem
            onPress={() => item.action && item.action()}
            key={item.id}
            shortcut={item?.shortcut}
            startContent={<span>{item.icon}</span>}
          >
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownComponent>
  );
}
