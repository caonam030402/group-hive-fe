"use client";

import { useDisclosure } from "@heroui/modal";
import Image from "next/image";
import React, { useState } from "react";

import Card from "@/components/common/Card";
import ModalRecommendBase from "@/components/modals/ModalRecommendBase";
import { iconPath } from "@/constants/icons";
import { EListBase } from "@/enums/docs";

const listQuickAction = [
  {
    key: EListBase.DOC,
    title: "New Docs",
    icon: iconPath.doc,
  },
  {
    key: EListBase.SHEET,
    title: "New Sheet",
    icon: iconPath.sheet,
  },
  {
    key: EListBase.SLIDE,
    title: "New Slide",
    icon: iconPath.slide,
  },
  {
    key: EListBase.FORM,
    title: "New Form",
    icon: iconPath.form,
  },
];

export default function QuickAction() {
  const [activeKey, setActiveKey] = useState<EListBase>();
  console.log(activeKey);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOpenModal = (key: EListBase) => {
    onOpen();
    setActiveKey(key);
  };

  return (
    <div className="flex gap-3 ">
      {listQuickAction.map((item) => (
        <button
          type="button"
          key={item.key}
          className="w-1/4 cursor-pointer justify-center gap-3 transition-all hover:scale-[101%] hover:shadow-sm"
          onClick={() => handleOpenModal(item.key)}
        >
          <Card key={item.title}>
            <div className="flex gap-2 py-2">
              <Image alt="" src={item.icon} width={25} height={25} />
              <div className="text-[14px]">{item.title}</div>
            </div>
          </Card>
        </button>
      ))}
      <ModalRecommendBase
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
