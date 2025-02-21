import { Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";

import Card from "@/components/common/Card";
import { PATH } from "@/constants";

export default function CreateItem() {
  const router = useRouter();
  const handleCreate = () => {
    router.push(PATH.BASE_DOC);
  };
  return (
    <button type="button" onClick={handleCreate}>
      <Card
        classNames={{
          base: "h-[250px]",
          body: "flex items-center justify-center h-full",
        }}
      >
        <Plus className="text-primary" size={35} />
        <div className="mt-2 text-xs">New docs</div>
      </Card>
    </button>
  );
}
