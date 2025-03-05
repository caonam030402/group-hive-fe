import { Tab as TabItem, Tabs, type TabsProps } from "@heroui/react";
import React from "react";

interface IProps extends TabsProps {
  listTab: {
    title: string;
    key: number | string;
  }[];
}
export default function Tab({ listTab, ...props }: IProps) {
  return (
    <Tabs
      classNames={{
        tab: "px-0",
        tabList: "flex gap-6",
      }}
      variant="underlined"
      {...props}
    >
      {listTab.map((item) => (
        <TabItem key={item.key} title={item.title} />
      ))}
    </Tabs>
  );
}
