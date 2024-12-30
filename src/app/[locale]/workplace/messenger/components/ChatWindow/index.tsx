import React from "react";

import Card from "@/components/common/Card";

import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  return (
    <Card
      footer={<Footer />}
      isDecorative={false}
      classNames={{
        header: "p-0",
        footer: "overflow-visible",
      }}
      header={<Header />}
    >
      {params.id}
    </Card>
  );
}
