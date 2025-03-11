import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

import { EListDocsHub } from "@/enums/docsHub";

import SideContent from "./SideContent";
import SideNav from "./SideNav";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  activeKey: EListDocsHub | undefined;
  setActiveKey: React.Dispatch<React.SetStateAction<EListDocsHub | undefined>>;
}

export const listBase = [
  { key: "", label: "All Type" },
  { key: EListDocsHub.DOC, label: "Docs" },
  { key: EListDocsHub.FORM, label: "Form" },
  { key: EListDocsHub.SHEET, label: "Sheet" },
  { key: EListDocsHub.SLIDE, label: "Slide" },
];

export default function ModalRecommendBase({
  isOpen,
  onOpenChange,
  activeKey,
  setActiveKey,
}: IProps) {
  return (
    <Modal
      classNames={{ base: "max-w-[60vw]" }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="mt-4 flex justify-between gap-1">
              <div>Templates</div>
              <div className="flex gap-3">
                <Input
                  className="w-[300px]"
                  size="sm"
                  startContent={<MagnifyingGlass />}
                  placeholder="Search template"
                />
                <Select
                  onSelectionChange={(key) =>
                    setActiveKey(key as unknown as EListDocsHub)
                  }
                  color="primary"
                  defaultSelectedKeys={activeKey?.toString()}
                  disableSelectorIconRotation
                  size="sm"
                  selectorIcon={<Funnel />}
                  className="w-[100px]"
                >
                  {listBase.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </ModalHeader>
            <ModalBody className="border-t p-0">
              <div className="flex">
                <SideNav />
                <SideContent activeKey={activeKey} />
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
