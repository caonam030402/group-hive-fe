"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

import IntroSection from "../(auth)/register/components/IntroSection";
import AddWorkSpace from "./components/AddWorkSpace";
import JoinWorkSpace from "./components/JoinWorkSpace";

export default function GetStarted() {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onOpenChange: onOpenChangeJoin,
  } = useDisclosure();

  return (
    <section className="flex h-screen text-sm">
      <IntroSection />

      <div className="h-screen flex-1">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-[30vw] text-center">
            <div className="text-3xl font-bold">Create a new workspace</div>
            <p className="mt-4 text-gray-500">
              Lark gives your team a home — a place where they can talk and work
              together. To create a new workspace, click the button below.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onPress={onOpenAdd} className="mt-5" color="primary">
                Create workspace
              </Button>
              <Button onPress={onOpenJoin} className="mt-5 " color="default">
                Join Workspace
              </Button>
            </div>
            {/* <p className="mt-4 text-sm text-gray-500">Or open a workspace</p>
            <ListWorkSpace /> */}
            <AddWorkSpace isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} />
            <JoinWorkSpace
              isOpen={isOpenJoin}
              onOpenChange={onOpenChangeJoin}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
