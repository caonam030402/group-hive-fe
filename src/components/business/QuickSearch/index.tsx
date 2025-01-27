import { Button } from "@nextui-org/button";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

interface Props {
  isExpanded?: boolean;
}

export default function QuickSearch({ isExpanded }: Props) {
  if (isExpanded) {
    return (
      <Button
        size="sm"
        className="size-4 w-full justify-start py-2 text-gray-500"
      >
        <MagnifyingGlass size={18} /> Search
      </Button>
    );
  }
  return (
    <Button size="sm" isIconOnly className="size-4 rounded-full">
      <MagnifyingGlass size={18} />
    </Button>
  );
}
