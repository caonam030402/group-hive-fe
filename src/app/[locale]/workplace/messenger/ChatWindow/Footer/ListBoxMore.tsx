import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { Image, PlusCircle } from "@phosphor-icons/react";
import React, { useRef, useState } from "react";

import ModalSendImage from "@/components/modals/ModalSendImage";

export default function ListBoxMore() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlImages, setUrlImage] = useState<string[]>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);

    const fileArray = selectedFiles.map((file: any) => {
      return {
        url: URL.createObjectURL(file),
        name: file.name,
      };
    });
    console.log(fileArray);

    if (selectedFiles.length > 0) {
      const url = URL.createObjectURL(selectedFiles[0]);
      setUrlImage([url]);
      onOpen();
    }
  };

  const listQuickCreate = [
    {
      id: "1",
      name: "Image & Video",
      icon: <Image />,
      action: handleFileSelect,
    },
  ];

  return (
    <>
      <Dropdown placement="top">
        <DropdownTrigger>
          <PlusCircle size={18} />
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          {listQuickCreate.map((item) => (
            <DropdownItem
              key={item.id}
              classNames={{ title: "text-xs", base: "color-contract-light" }}
              startContent={item.icon}
              onClick={item.action}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <ModalSendImage
        urlImages={urlImages || []}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name=""
        onClose={onClose}
      />
    </>
  );
}
