import type { IUserChat } from "@/types/chat";

import { AppConfig } from "../configs/main/appConfig";

export const formatEmailHide = (email: string) => {
  if (!email) return null;
  const [localPart = "", domain = ""] = email.split("@");
  const maskedLocal = `${localPart[0]}${"*".repeat(localPart.length - 1)}`;
  const maskedDomain = `${"*".repeat(domain.length)}`;
  return `${maskedLocal}@${maskedDomain}`;
};

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const getUserFriend = ({
  userChats,
  currentUser,
}: {
  userChats?: IUserChat[];
  currentUser?: number;
}): IUserChat | undefined => {
  if (!userChats) return undefined;
  const user = userChats?.filter((chat) => chat.user.id !== currentUser)[0];
  return user ?? userChats[0];
};

export const renderFullName = (firstName?: string, lastName?: string) => {
  return `${firstName ?? ""} ${lastName ?? ""}`;
};
