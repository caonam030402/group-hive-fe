import { Avatar } from "@heroui/avatar";
import React from "react";

import Divider from "@/components/common/Divider";
import { renderFullName } from "@/utils/helpers";

import ControlPanel from "./ControlPanel";
import ListAction from "./ListAction";

interface IProps {
  recipientUser: IUser | undefined;
}

export default function Header({ recipientUser }: IProps) {
  const renderAvatar = recipientUser?.avatar;
  const renderName = renderFullName(
    recipientUser?.firstName,
    recipientUser?.lastName,
  );

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
