import { Plus } from "@phosphor-icons/react";
import React from "react";
import toast from "react-hot-toast";

import Card from "@/components/common/Card";
import { PATH } from "@/constants";
import { docsHubService } from "@/services/docsHub";
import { userService } from "@/services/user";
import useNavigate from "@/utils/navigate";

export default function CreateItem() {
  const { navigate, searchParams } = useNavigate();
  const { mutate } = docsHubService.useCreateDocs();
  const { user } = userService.useProfile();

  const handleCreate = () => {
    const body = {
      author: {
        id: user.id,
      },
      docsType: Number(searchParams.get("docsType") || 0),
      lastOpenedAt: new Date().toISOString(),
      name: "Untitled document",
    };
    mutate(body, {
      onSuccess: () => {
        toast.success("Create docs successfully");
        navigate({ customUrl: PATH.BASE_DOC });
      },
    });
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
