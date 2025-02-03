import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import React from "react";

import type { IPropModal } from "@/types";

import TabMember from "./TabMember";

const listTab = [
  {
    id: "1",
    title: "Top results",
  },
  {
    id: "2",
    title: "Messages",
  },
  {
    id: "3",
    title: "Docs",
  },
  {
    id: "4",
    title: "Apps",
  },
  {
    id: "5",
    title: "Contacts",
  },
  {
    id: "6",
    title: "Meeting",
  },
];

export default function ModalQuickSearch({ isOpen, onOpenChange }: IPropModal) {
  return (
    <Modal
      classNames={{ closeButton: "hidden" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mt-2 flex items-center gap-1">
              <Input
                placeholder="One search,find anything"
                startContent={<MagnifyingGlass />}
              />
              <Button size="sm" variant="light" isIconOnly onPress={onClose}>
                <X size={20} />
              </Button>
            </ModalHeader>
            <ModalBody className="pt-0">
              <Tabs size="sm" aria-label="Tabs variants" variant="underlined">
                {listTab.map((tab) => (
                  <Tab key={tab.id} title={tab.title} />
                ))}
              </Tabs>
              <div className="min-h-80">
                <TabMember />
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
