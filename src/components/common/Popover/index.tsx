import {
  Popover as PopoverComponent,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "@heroui/popover";
import type React from "react";

interface IProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  props?: PopoverProps;
  propsContent?: PopoverContentProps;
  propsTrigger?: PopoverTriggerProps;
}

export default function Popover({
  children,
  props,
  propsContent,
  propsTrigger,
  trigger,
}: IProps) {
  return (
    <PopoverComponent placement="bottom" showArrow {...props}>
      <PopoverTrigger {...propsTrigger}>{trigger}</PopoverTrigger>
      <PopoverContent {...propsContent}>{children}</PopoverContent>
    </PopoverComponent>
  );
}
