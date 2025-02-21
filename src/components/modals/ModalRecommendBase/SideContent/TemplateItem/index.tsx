import { Button } from "@heroui/button";
import { DotsThree } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

import Card from "@/components/common/Card";
import { iconPath } from "@/constants/icons";

export default function TemplateItem() {
  const header = () => (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-1">
        <Image width={20} height={20} src={iconPath.doc} alt="" />
        <div className="text-sm">Meeting Notes</div>
      </div>
    </div>
  );

  const footer = () => (
    <div className="bg-gradient-white-transparent absolute bottom-3 flex w-full gap-2 rounded-lg p-3 pt-14 opacity-0 duration-200 group-hover:bottom-0 group-hover:opacity-100">
      <Button className="w-[65%]" size="sm" color="primary" variant="bordered">
        Preview
      </Button>
      <Button className="flex-1" size="sm" color="primary">
        Use
      </Button>
    </div>
  );
  return (
    <div className="group relative h-[250px] translate-y-2 cursor-pointer duration-300 hover:translate-y-1">
      <Card classNames={{ body: "pt-0 h-full" }} header={header()}>
        <Image
          width={500}
          height={500}
          className="size-full object-cover"
          src="https://media.gcflearnfree.org/content/55e073a97dd48174331f51a0_01_17_2014/lg5.jpg"
          alt=""
        />
        <p className="color-contract-light mt-2 text-xs">Used by 1k people</p>
      </Card>
      {footer()}
      <div className="absolute right-0 top-0 p-2 opacity-0 duration-200 group-hover:opacity-100">
        <div className="rounded-md bg-background p-1">
          <DotsThree size={20} />
        </div>
      </div>
    </div>
  );
}
