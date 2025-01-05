"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";

import { workspaceGet } from "@/api";
import RenderCondition from "@/components/common/RenderCondition";
import Header from "@/components/layouts/Header";
import { bgBluePink } from "@/constants/bgImage";
import useApi from "@/hooks/useApi";

import AddWorkSpace from "./components/AddWorkSpace";
import JoinWorkSpace from "./components/JoinWorkSpace";
import ListWorkSpace from "./components/ListWorkSpace";

export default function GetStarted() {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onOpenChange: onOpenChangeJoin,
  } = useDisclosure();

  const { fetch, isLoading } = useApi();
  const [listWorkSpace, setListWorkSpace] = React.useState<IWorkspace[]>([]);
  const handleFetchListWorkSpace = useCallback(() => {
    fetch({
      fn: workspaceGet(),
      onSuccess: (data) => {
        const res = data.payload?.data;
        res && setListWorkSpace(res);
      },
    });
  }, []);

  useEffect(() => {
    handleFetchListWorkSpace();
  }, [handleFetchListWorkSpace]);

  const isHaveWorkspace = listWorkSpace.length > 0;
  const title = isHaveWorkspace ? "Welcome back" : "Create Workspace";
  const description = isHaveWorkspace
    ? "Lark gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below"
    : "Lark gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below";

  return (
    <>
      <div className="bg-white">
        <Header />
      </div>

      <div
        style={{
          backgroundImage: `url(${bgBluePink})`,
        }}
        className="flex h-[calc(100vh-70px)] items-center justify-center"
      >
        {!isLoading && (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-[30vw] text-center">
              <div className="text-3xl font-bold">{title}</div>
              <p className="mt-4 text-gray-500">{description}</p>
              <RenderCondition
                condition={isHaveWorkspace}
                ifContent={
                  <ListWorkSpace
                    onAddOpen={onOpenAdd}
                    listWorkSpace={listWorkSpace}
                  />
                }
                elseContent={
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onPress={onOpenAdd}
                      className="mt-5"
                      color="primary"
                    >
                      Create workspace
                    </Button>
                    <Button
                      onPress={onOpenJoin}
                      className="mt-5 "
                      color="default"
                    >
                      Join Workspace
                    </Button>
                  </div>
                }
              />
              <AddWorkSpace
                onCloseAdd={onCloseAdd}
                isOpen={isOpenAdd}
                onOpenChange={onOpenChangeAdd}
              />
              <JoinWorkSpace
                isOpen={isOpenJoin}
                onOpenChange={onOpenChangeJoin}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
