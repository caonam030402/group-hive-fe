import { Plus } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

import Card from "@/components/common/Card";
import { keyRQ } from "@/constants/keyRQ";
import { type EListDocsHub, EScopeDocsHub } from "@/enums/docsHub";
import useDocsHub from "@/hooks/features/docsHub";
import useWorkspace from "@/hooks/useWorkspace";
import { docsHubService } from "@/services/docsHub";
import { userService } from "@/services/user";

interface IProps {
  activeKey: EListDocsHub | undefined;
}

export default function CreateItem({ activeKey }: IProps) {
  const { mutate } = docsHubService.useCreateDocs();
  const { user } = userService.useProfile();
  const { workspaceId } = useWorkspace();
  const queryClient = useQueryClient();
  const { menuFolderActive, handleOpenPage } = useDocsHub();

  const handleCreate = () => {
    const body = {
      author: {
        id: user.id,
      },
      workspace: {
        id: workspaceId,
      },
      docsType: activeKey,
      lastOpenedAt: new Date().toISOString(),
      scope: menuFolderActive?.scope || EScopeDocsHub.PERSONAL,
      name: "Untitled document",
    };
    mutate(body, {
      onSuccess: (data) => {
        toast.success("Create docs successfully");
        queryClient.invalidateQueries({ queryKey: [keyRQ.docsHub] });
        handleOpenPage({
          id: data.payload.id,
          type: data.payload.docsType,
        });
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
