import type { EChatType, EMessageStatus, EMessageType } from "@/enums/chat";

interface IMessage {
  id?: string;
  type: EMessageType;
  status: EMessageStatus;
  content: string;
  user: IUser;
  sentAt: string;
}

interface IUserChat {
  user: IUser;
}

interface IChat {
  id: string;
  name: string;
  avatar: string;
  chatType: EChatType;
  lastMessage: IMessage;
  createdAt: string;
  updatedAt: string;
  userChats: IUserChat[];
}
