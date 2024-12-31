import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { cn } from "@nextui-org/theme";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import React from "react";

import Card from "@/components/common/Card";

export default function ListWorkSpace() {
  return (
    <Card classNames={{ base: "h-auto mt-4 w-[80%] mx-auto" }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="flex cursor-pointer items-center justify-between rounded-md border-gray-200 px-2 py-3 hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <Avatar
                size="md"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <div>
                <div>Workspace {index + 1}</div>
                <div className="text-xs text-gray-500">44 members</div>
              </div>
            </div>
            <Button isIconOnly size="sm">
              <IoIosArrowForward />
            </Button>
          </div>
          <Divider className={cn("my-0", index === 4 && "hidden")} />
        </div>
      ))}
    </Card>
  );
}
