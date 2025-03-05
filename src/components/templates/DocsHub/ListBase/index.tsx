"use client";

import { DotsThree } from "@phosphor-icons/react";
import React from "react";

import Button from "@/components/common/Button";
import Tab from "@/components/common/Tab";
import TableList from "@/components/common/Table";
import User from "@/components/common/User";
import { docsHubService } from "@/services/docsHub";
import type { IDocsHub } from "@/types/docsHub";
import { formatCustomTime } from "@/utils/formatDate";
import { renderFullName } from "@/utils/helpers";

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

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "OWNER",
    label: "OWNER",
    render: (data: IDocsHub) => {
      return (
        <div>
          <span className="font-normal">
            <User
              classNames={{ avatar: "w-6 h-6", name: "text-sm font-normal" }}
              info={{
                name: renderFullName(
                  data.author.firstName,
                  data.author.lastName,
                ),
                avatar: data.author.avatar,
              }}
            />
          </span>
        </div>
      );
    },
  },
  {
    key: "lastOpenedAt",
    label: "LAST OPENED",
    render: (data: IDocsHub) => {
      return <span>{formatCustomTime(data.lastOpenedAt)}</span>;
    },
  },
  {
    key: "action",
    label: "ACTION",
    render: () => {
      return (
        <Button size="sm" variant="light" isIconOnly>
          <DotsThree size={20} />
        </Button>
      );
    },
  },
];

export default function ListBase() {
  const [tabActive, setTabActive] = React.useState(ETabKey.RECENT);
  console.log(tabActive);
  const { data, isLoading } = docsHubService.useGetAllDocs({});
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
      {!isLoading && <TableList data={data} columns={columns} removeWrapper />}
    </div>
  );
}
