import { Avatar } from "@nextui-org/avatar";
import { useSession } from "next-auth/react";
import React from "react";

import Divider from "@/components/common/Divider";
import type { IChat } from "@/types/chat";
import { getUserFriend, renderFullName } from "@/utils/helpers";

import ControlPanel from "./ControlPanel";
import ListAction from "./ListAction";

interface IProps {
  chatDetail: IChat | null | undefined;
}

export default function Header({ chatDetail }: IProps) {
  const { data } = useSession();
  const userFriend = getUserFriend({
    userChats: chatDetail?.userChats,
    currentUser: Number(data?.user?.id),
  });

  const user = userFriend?.user;

  const renderAvatar = user?.avatar;
  const renderName = renderFullName(user?.firstName, user?.lastName);

  return (
    <>
      <div className="flex w-full justify-between gap-2 px-3 py-2">
        <div className="flex gap-3">
          <Avatar size="md" src={renderAvatar} />
          <div>
            <div className="h-6 text-[17px] font-medium"> {renderName}</div>
            <ControlPanel />
          </div>
        </div>
        <ListAction />
      </div>
      <Divider className="m-0" />
    </>
  );
}
