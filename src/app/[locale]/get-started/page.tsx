"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import React from "react";

import AddWorkSpace from "./components/AddWorkSpace";
import ListWorkSpace from "./components/ListWorkSpace";

export default function GetStarted() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-screen">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-[30vw] text-center">
          <div className="text-3xl font-bold">Create a new workspace</div>
          <p className="mt-4 text-gray-500">
            Lark gives your team a home — a place where they can talk and work
            together. To create a new workspace, click the button below.
          </p>
          <Button onPress={onOpen} className="mt-5 text-base" color="primary">
            <IoMdAdd /> Create workspace
          </Button>
          <p className="mt-4 text-sm text-gray-500">Or open a workspace</p>
          <ListWorkSpace />
          <AddWorkSpace isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
      </div>
    </div>
  );
}
