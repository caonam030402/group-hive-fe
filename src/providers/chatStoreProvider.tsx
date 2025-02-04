"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  type ChatStore,
  createChatStore,
  defaultInitState,
} from "@/stores/chatStore";

export type ChatStoreApi = ReturnType<typeof createChatStore>;

export const ChatStoreContext = createContext<ChatStoreApi | undefined>(
  undefined,
);

export interface ChatStoreProviderProps {
  children: ReactNode;
}

export const ChatStoreProvider = ({ children }: ChatStoreProviderProps) => {
  const storeRef = useRef<ChatStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createChatStore(defaultInitState);
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const ChatStoreContextS = useContext(ChatStoreContext);

  if (!ChatStoreContextS) {
    throw new Error(`useChatStore must be used within ChatStoreProvider`);
  }

  return useStore(ChatStoreContextS, selector);
};
