import React from "react";

import Card from "@/components/common/Card";

import ListBase from "./ListBase";
import QuickAction from "./QuickAction";

export default function DocsHub() {
  return (
    <Card classNames={{ body: "flex flex-col gap-3" }} isDecorative={false}>
      <h2 className="mb-2 text-xl">Docs</h2>
      <QuickAction />
      <ListBase />
    </Card>
  );
}
