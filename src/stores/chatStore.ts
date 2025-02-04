import { createStore } from "zustand/vanilla";

export type ChatState = {
  userSelected: IUser | null;
};

export type ChatActions = {
  setUserSelected: (userChat: IUser) => void;
};

export type ChatStore = ChatState & ChatActions;

export const defaultInitState: ChatState = {
  userSelected: null,
};

export const createChatStore = (initState: ChatState = defaultInitState) => {
  return createStore<ChatStore>()((set) => ({
    ...initState,
    setUserSelected: (userChat: IUser) =>
      set(() => ({ userSelected: userChat })),
  }));
};
