import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

import ModalQuickSearch from "@/components/modals/ModalQuickSearch";

interface Props {
  isExpanded?: boolean;
}

export default function QuickSearch({ isExpanded }: Props) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <ModalQuickSearch
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <Button
        onPress={onOpen}
        size="sm"
        isIconOnly
        className="size-4 rounded-full"
      >
        <MagnifyingGlass size={18} />
      </Button>
    </>
  );
}
