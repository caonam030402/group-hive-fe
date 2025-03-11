"use client";

import { useDisclosure } from "@heroui/modal";
import Image from "next/image";
import React, { useState } from "react";

import Card from "@/components/common/Card";
import ModalRecommendBase from "@/components/modals/ModalRecommendBase";
import { listDocsHub } from "@/constants/dric";
import type { EListDocsHub } from "@/enums/docsHub";
import useNavigate from "@/hooks/navigate";

export default function QuickAction() {
  const [activeKey, setActiveKey] = useState<EListDocsHub>();
  const { navigate } = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = (key: EListDocsHub) => {
    navigate({ paramsList: [{ name: "docsType", value: key.toString() }] });
    onOpen();
    setActiveKey(key);
  };

  return (
    <div className="flex gap-3 ">
      {listDocsHub.map((item) => (
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
