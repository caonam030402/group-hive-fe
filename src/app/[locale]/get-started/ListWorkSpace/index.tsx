import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import React from "react";

import Card from "@/components/common/Card";
import useWorkspace from "@/hooks/useWorkspace";

interface IProps {
  listWorkSpace: IWorkspace[] | undefined;
  onAddOpen?: () => void;
}

export default function ListWorkSpace({ listWorkSpace, onAddOpen }: IProps) {
  const { handleSaveAndNavigateToWorkplace } = useWorkspace();
  if (!listWorkSpace) return <div />;
  const handleLaunch = (id: string) => {
    handleSaveAndNavigateToWorkplace(id);
  };
  return (
    <Card classNames={{ base: "h-auto mt-4 w-[80%] mx-auto" }}>
      {listWorkSpace.map((item, index) => (
        <div key={index}>
          <div className="flex cursor-pointer items-center justify-between rounded-md border-gray-200 px-2 py-3 hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <Avatar
                size="md"
                src={
                  item.avatar ||
                  "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
              />
              <div>
                <div>{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.members.length} members
                </div>
              </div>
            </div>
            <Button onPress={() => handleLaunch(item.id)} size="sm">
              Launch
            </Button>
          </div>
          <Divider />
        </div>
      ))}
      <Button onPress={onAddOpen} color="primary" className="mt-3">
        Create new workspace
      </Button>
    </Card>
  );
}
