"use client";

import { Tab, Tabs } from "@heroui/react";
import React from "react";

import Card from "@/components/common/Card";
import TableList from "@/components/common/Table";

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
    key: "owner",
    label: "OWNER",
  },
  {
    key: "lastOpened",
    label: "LAST OPENED",
  },
];

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    owner: "CEO",
    lastOpened: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    owner: "Technical Lead",
    lastOpened: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    owner: "Senior Developer",
    lastOpened: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    owner: "Community Manager",
    lastOpened: "Vacation",
  },
];

export default function Bases() {
  const [tabActive, setTabActive] = React.useState(ETabKey.RECENT);
  console.log(tabActive);
  const tab = () => {
    return (
      <Tabs
        onSelectionChange={(key) => setTabActive(key as ETabKey)}
        aria-label="Tabs variants"
        variant="underlined"
      >
        {listTab.map((item) => (
          <Tab key={item.key} title={item.title} />
        ))}
      </Tabs>
    );
  };
  return (
    <Card title="Bases" header={<>{tab()}</>}>
      <TableList data={rows} columns={columns} removeWrapper />
    </Card>
  );
}
