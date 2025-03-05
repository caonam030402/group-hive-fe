import React from "react";

import Card from "@/components/common/Card";

import ListBase from "./ListBase";
import QuickAction from "./QuickAction";

export default function DocsHub() {
  return (
    <Card classNames={{ body: "flex flex-col gap-3" }} isDecorative={false}>
      <QuickAction />
      <ListBase />
    </Card>
  );
}
