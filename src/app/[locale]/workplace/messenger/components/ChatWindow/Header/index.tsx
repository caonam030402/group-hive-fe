import { Avatar } from "@nextui-org/avatar";
import React from "react";

import Divider from "@/components/common/Divider";

import ControlPanel from "./ControlPanel";
import ListAction from "./ListAction";

export default function Header() {
  return (
    <>
      <div className="flex w-full justify-between gap-2 px-3 py-2">
        <div className="flex gap-3">
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
          <div>
            <div className="text-[17px] font-medium"> Development Team</div>
            <ControlPanel />
          </div>
        </div>
        <ListAction />
      </div>
      <Divider className="m-0" />
    </>
  );
}
