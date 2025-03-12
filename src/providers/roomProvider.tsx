"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export function Room({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const roomId = params?.get("id") || "";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
