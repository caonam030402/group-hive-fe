import { Button, Tooltip } from "@nextui-org/react";
import { GrExpand } from "@react-icons/all-files/gr/GrExpand";
import { HiOutlineEmojiHappy } from "@react-icons/all-files/hi/HiOutlineEmojiHappy";
import { MdTextFormat } from "@react-icons/all-files/md/MdTextFormat";
import React from "react";

interface IProps {
  setOpenEmojis: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UtilityBar({ setOpenEmojis }: IProps) {
  const listUtilityBar = [
    {
      id: "1",
      name: "Formatting",
      icon: <MdTextFormat size={23} />,
    },
    {
      id: "2",
      name: "Emoji",
      icon: <HiOutlineEmojiHappy size={18} />,
      action: () => setOpenEmojis(true),
    },
    // {
    //   id: "3",
    //   name: "Mention",
    //   icon: "@",
    // },
    {
      id: "4",
      name: "Expend",
      icon: <GrExpand size={13} />,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {listUtilityBar.map((item) => {
        return (
          <Tooltip showArrow content={item.name} key={item.id}>
            <Button
              size="sm"
              className="bg-transparent hover:bg-zinc-200"
              isIconOnly
              onClick={item.action}
            >
              <div className="text-base">{item.icon}</div>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
