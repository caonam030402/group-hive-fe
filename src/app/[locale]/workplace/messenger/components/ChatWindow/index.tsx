import React, { useEffect } from "react";

import { chatGetDetail } from "@/api";
import Card from "@/components/common/Card";
import useApi from "@/hooks/useApi";
import type { IChat } from "@/types/chat";

import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  const [chatDetail, setChatDetail] = React.useState<IChat | null>();
  const { fetch } = useApi();
  console.log(params);
  console.log(chatDetail);
  const handleFetch = React.useCallback(() => {
    fetch({
      fn: chatGetDetail(params.id),
      onSuccess: (data) => {
        setChatDetail(data.payload);
      },
    });
  }, [params.id]);

  useEffect(() => {
    handleFetch();
  }, [params.id]);
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
