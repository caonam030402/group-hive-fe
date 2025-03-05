"use client";

import { Spinner } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { DotsThree } from "@phosphor-icons/react";
import { useAsyncList } from "@react-stately/data";
import Image from "next/image";
import React from "react";

import Button from "@/components/common/Button";
import Tab from "@/components/common/Tab";
import TableList from "@/components/common/Table";
import User from "@/components/common/User";
import { listDocsHub } from "@/constants/dric";
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
        <Button size="sm" variant="light" isIconOnly>
          <DotsThree size={20} />
        </Button>
      );
    },
  },
];

export default function ListBase() {
  const [tabActive, setTabActive] = React.useState(ETabKey.RECENT);
  const [isLoadingTable, setIsLoadingTable] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);
  const { data, isLoading } = docsHubService.useGetAllDocs({});

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoadingTable(false);
      }
      console.log(cursor);
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal },
      );
      const json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });
  console.log(tabActive);
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
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
