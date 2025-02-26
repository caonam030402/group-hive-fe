"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { Button, Tooltip } from "@heroui/react";
import {
  ArrowsOutCardinal,
  Image as ImageIcon,
  PencilSimpleLine,
  SmileySticker,
  Trash,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

import Dropdown from "@/components/common/Dropdown";
import EmojisPicker from "@/components/common/EmojisPicker";

export default function Doc() {
  const editor = useCreateBlockNote();
  const [cover, setCover] = useState<undefined | string>(undefined);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/06/24/16/36/home-820389_1280.jpg";

  const listActionCover = [
    {
      id: "1",
      name: "Select image",
      icon: <ImageIcon />,
      action: () => null,
    },
    {
      id: "2",
      name: "Reposition image",
      icon: <ArrowsOutCardinal />,
      action: () => null,
    },
    {
      id: "3",
      name: "Delete cover",
      icon: <Trash />,
      action: () => null,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      {cover && (
        <div className="group/cover relative">
          <Image
            width={2000}
            height={2000}
            alt=""
            className="h-[300px] object-cover"
            src={cover}
          />
          <Dropdown
            props={{
              placement: "bottom",
            }}
            listItem={listActionCover}
            trigger={
              <Button
                size="sm"
                color="primary"
                startContent={<PencilSimpleLine size={14} />}
                className="absolute bottom-[4%] right-[1%] opacity-0 transition-all group-hover/cover:opacity-100"
                variant="solid"
              >
                Edit Cover
              </Button>
            }
          />
        </div>
      )}

      <div className="mt-14 max-w-[55vw]">
        <div className="mb-3 px-14">
          <Tooltip
            placement="top-start"
            classNames={{
              base: ["before:bg-neutral-400 dark:before:bg-white"],
              content: "px-0 shadow-none bg-transparent",
            }}
            color="secondary"
            content={
              <div className="color-contract-light flex gap-2">
                <EmojisPicker
                  buttonTrigger={{
                    content: "Add Icon",
                    props: {
                      className: "px-1",
                      variant: "light",
                      startContent: <SmileySticker size={18} />,
                      size: "sm",
                    },
                  }}
                  onEmojiSelected={(icon) => console.log(icon)}
                />

                {!cover && (
                  <Button
                    onPress={() => setCover(defaultImage)}
                    className="px-1"
                    startContent={<ImageIcon size={18} />}
                    variant="light"
                    size="sm"
                  >
                    Add Cover
                  </Button>
                )}
              </div>
            }
          >
            <input
              className="bg-white text-4xl font-bold focus:outline-none"
              placeholder="Enter title here"
            />
          </Tooltip>
        </div>
        <BlockNoteView theme="light" className="h-full" editor={editor} />
      </div>
    </div>
  );
}
