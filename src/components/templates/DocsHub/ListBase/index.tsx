/* eslint-disable unused-imports/no-unused-vars */

"use client";

import { Spinner } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import {
  Copy,
  DotsThree,
  Heart,
  Link as LinkIcon,
  PushPin,
  Share,
  Trash,
} from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Tab from "@/components/common/Tab";
import TableList from "@/components/common/Table";
import User from "@/components/common/User";
import { docsHubSidebarMenu } from "@/constants/docsHub";
import { listDocsHub } from "@/constants/dric";
import { EScopeDocsHub } from "@/enums/docsHub";
import useDocsHub from "@/hooks/features/useDocsHub";
import useNavigate from "@/hooks/navigate";
import { useStateRef } from "@/hooks/useStateRef";
import useWorkspace from "@/hooks/useWorkspace";
import { docsHubService } from "@/services/docsHub";
import { userService } from "@/services/user";
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

const listItemAction = [
  { id: "1", name: "Share", icon: <Share size={17} />, action: () => null },
  {
    id: "2",
    name: "Copy Link",
    icon: <LinkIcon size={17} />,
    action: () => null,
  },
  {
    id: "2",
    name: "Make a Copy",
    icon: <Copy size={17} />,
    action: () => null,
  },
  {
    id: "2",
    name: "Add to Pins",
    icon: <PushPin size={17} />,
    action: () => null,
  },
  {
    id: "2",
    name: "Add to Favorites",
    icon: <Heart size={17} />,
    action: () => null,
  },
  { id: "2", name: "Delete", icon: <Trash size={17} />, action: () => null },
];

const columns = [
  {
    key: "name",
    label: "NAME",
    render: (data: IDocsHub) => {
      return (
        <span className="flex gap-2">
          <Image
            alt=""
            src={
              listDocsHub.find((item) => item.key === data.docsType)?.icon || ""
            }
            width={20}
            height={20}
          />
          {data.name}
        </span>
      );
    },
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
        <Dropdown
          props={{ placement: "bottom-end" }}
          listItem={listItemAction}
          trigger={
            <Button size="sm" variant="light" isIconOnly>
              <DotsThree size={20} />
            </Button>
          }
        />
      );
    },
  },
];

export default function ListBase() {
  const [tabActive, setTabActive] = React.useState(ETabKey.RECENT);
  const [isLoadingTable, setIsLoadingTable] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);
  console.log(setIsLoadingTable, setHasMore);
  const { workspaceId } = useWorkspace();
  const { user } = userService.useProfile();
  const { getDynamicRoute } = useNavigate();
  const keyMenu = getDynamicRoute() || "";

  const [menuDataActive] = useStateRef(() =>
    docsHubSidebarMenu.find((item) => item.link.includes(keyMenu)),
  );

  const { data, isLoading } = docsHubService.useGetAllDocs({
    userId: user.id || 0,
    workspaceId,
    isShared: menuDataActive()?.scope === EScopeDocsHub.SHARED,
    scope: menuDataActive()?.scope || EScopeDocsHub.PERSONAL,
    filterBy: {
      field: "docsType",
      value: tabActive.toString(),
    },
  });

  const { handleOpenPage } = useDocsHub();

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    // onLoadMore: list.loadMore,
  });

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
          isLoading={isLoadingTable}
          baseRef={scrollerRef}
          rowAction={(item) =>
            handleOpenPage({ id: item.id, type: item.docsType })
          }
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="white" />
              </div>
            ) : null
          }
          data={data}
          columns={columns}
          removeWrapper
        />
      )}
    </div>
  );
}
