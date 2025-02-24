import { Button } from "@heroui/button";
import {
  Dropdown as DropdownComponent,
  DropdownItem,
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownProps,
  DropdownTrigger,
  type DropdownTriggerProps,
} from "@heroui/dropdown";
import { cn } from "@heroui/theme";
import { Plus } from "@phosphor-icons/react";
import React from "react";

interface IProps {
  listItem: {
    id: string;
    name: string;
    icon: React.JSX.Element;
    shortcut?: string;
    action: () => void;
  }[];
  props?: DropdownProps;
  propsMenu?: DropdownMenuProps;
  propsTrigger?: DropdownTriggerProps;
}

export default function Dropdown({
  listItem,
  props,
  propsMenu,
  propsTrigger,
}: IProps) {
  return (
    <DropdownComponent placement="left-start" {...props}>
      <DropdownTrigger {...propsTrigger}>
        <Button size="sm" isIconOnly className={cn("rounded-full size-2")}>
          <Plus size={18} />
        </Button>
      </DropdownTrigger>
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
