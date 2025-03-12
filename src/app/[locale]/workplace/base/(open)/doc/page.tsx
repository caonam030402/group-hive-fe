"use client";

import { Button, Tooltip } from "@heroui/react";
import { useRoom } from "@liveblocks/react/suspense";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import {
  ArrowsOutCardinal,
  Image as ImageIcon,
  PencilSimpleLine,
  SmileySticker,
  Trash,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import BlockNote from "@/components/business/BlockNote";
import Dropdown from "@/components/common/Dropdown";
import EmojisPicker from "@/components/common/EmojisPicker";
import { userService } from "@/services/user";

export default function Doc() {
  const room = useRoom();
  const yProvider = getYjsProviderForRoom(room);
  const yDoc = yProvider.getYDoc();
  const { user } = userService.useProfile();

  const [metadata] = useState(() => yDoc.getMap("metadata"));
  const [title, setTitle] = useState(metadata.get("title") || "");
  const [cover, setCover] = useState<string | undefined>(
    metadata.get("cover") as string | undefined,
  );

  useEffect(() => {
    const handleChange = () => {
      setTitle(metadata.get("title") || "");
      setCover(metadata.get("cover") as string | undefined);
    };

    metadata.observe(handleChange);
    return () => metadata.unobserve(handleChange);
  }, [metadata]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    metadata.set("title", newTitle);
  };

  const handleCoverChange = (newCover: string) => {
    setCover(newCover);
    metadata.set("cover", newCover);
  };

  const handleDeleteCover = () => {
    setCover(undefined);
    metadata.delete("cover");
  };

  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/06/24/16/36/home-820389_1280.jpg";

  const listActionCover = [
    {
      id: "1",
      name: "Select image",
      icon: <ImageIcon />,
      action: () => handleCoverChange(defaultImage),
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
      action: handleDeleteCover,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
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
                    onPress={() => handleCoverChange(defaultImage)}
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
              value={title as string}
              onChange={handleTitleChange}
            />
          </Tooltip>
        </div>
        <BlockNote user={user} doc={yDoc} provider={yProvider} />
      </div>
    </div>
  );
}
