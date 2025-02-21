import { Plus } from "@phosphor-icons/react";
import React from "react";

import Card from "@/components/common/Card";

export default function CreateItem() {
  return (
    <Card
      classNames={{
        base: "h-[250px]",
        body: "flex items-center justify-center h-full",
      }}
    >
      <Plus className="text-primary" size={35} />
      <div className="mt-2 text-xs">New docs</div>
    </Card>
  );
}
