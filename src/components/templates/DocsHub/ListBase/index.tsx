"use client";

import React from "react";

import Tab from "@/components/common/Tab";
import TableList from "@/components/common/Table";
import { EScopeDocsHub } from "@/enums/docsHub";
import useDocsHub from "@/hooks/features/docsHub";
import useWorkspace from "@/hooks/useWorkspace";
import { docsHubService } from "@/services/docsHub";
import { userService } from "@/services/user";

enum ETabKey {
  RECENT,
  PINS,
  FAVORITES,
}

const listTab = [
  { title: "Recent", key: ETabKey.RECENT },
  { title: "Pins", key: ETabKey.PINS },
  { title: "Favorites", key: ETabKey.FAVORITES },
];

export default function ListBase() {
  const [tabActive, setTabActive] = React.useState(ETabKey.RECENT);

  const { workspaceId } = useWorkspace();
  const { user } = userService.useProfile();
  const { menuFolderActive, keyMenuFolder, listColumnsTable, handleOpenPage } =
    useDocsHub();

  const { data, isLoading } = docsHubService.useGetAllDocs(
    {
      userId: user?.id || 0,
      workspaceId,
      isShared: menuFolderActive?.scope === EScopeDocsHub.SHARED,
      scope: menuFolderActive?.scope || EScopeDocsHub.PERSONAL,
      filterBy: {
        field: "docsType",
        value: tabActive.toString(),
      },
    },
    {
      expendQueryKey: [keyMenuFolder],
    },
  );

  const tab = () => {
    return (
      <Tab
        listTab={listTab}
        onSelectionChange={(key) => setTabActive(key as ETabKey)}
      />
    );
  };
  return (
    <div className="flex flex-col gap-4">
      {tab()}
      {!isLoading && (
        <TableList
          rowAction={(item) =>
            handleOpenPage({ id: item.id, type: item.docsType })
          }
          data={data}
          columns={listColumnsTable}
          removeWrapper
        />
      )}
    </div>
  );
}
