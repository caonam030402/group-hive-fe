import { useMutation } from "@tanstack/react-query";

import { keyRQ } from "@/constants/keyRQ";
import type { EChatType } from "@/enums/chat";
import { useQueryCommon, useQueryInfiniteCommon } from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse, IQueryGetApi } from "@/types";
import type { IChat, IMessage, IUserChat } from "@/types/chat";
import { buildQueryParamsGet } from "@/utils/buildQueryParams";
import http from "@/utils/http";

export const chatGet = (query: IQueryGetApi) => {
  const queryString = buildQueryParamsGet(query);
  const url = `chat?${queryString}`;

  return http.get<IPaginationResponse<IChat>>(url);
};

export const chatGetDetail = (id: IChat["id"]) => {
  const url = `chat/${id}`;

  return http.get<IChat>(url);
};

export const messageGet = (query: IQueryGetApi) => {
  const queryString = buildQueryParamsGet(query);
  const url = `message?${queryString}`;
  return http.get<IPaginationResponse<IMessage>>(url);
};

export const chatService = {
  useCreateChat: () => {
    return useMutation({
      mutationFn: async (body: {
        userChats: IUserChat[];
        chatType: EChatType;
        workspace: IWorkspace;
        hasCheck: boolean;
      }) => {
        return http.post<IChat>("chat", {
          body,
        });
      },
    });
  },

  useGetAllChat: (queryS: IQueryGetApi, option?: IOptionRQ) => {
    const queryString = buildQueryParamsGet(queryS);
    const query = useQueryInfiniteCommon<IPaginationResponse<IChat>>({
      queryKey: [keyRQ.chat],
      url: `chat?${queryString}`,
      ...option,
    });
    return {
      ...query,
      data: query.data?.data,
    };
  },
  useGetAllMessage: (queryS: IQueryGetApi, option?: IOptionRQ) => {
    const queryString = buildQueryParamsGet(queryS);
    const query = useQueryInfiniteCommon<IPaginationResponse<IMessage>>({
      queryKey: [keyRQ.message, ...(option?.expendQueryKey || [])],
      url: `message?${queryString}`,
      ...option,
    });
    return {
      ...query,
      data: query.data?.data,
    };
  },
  useGetDetailMessage: (id: IMessage["id"], option?: IOptionRQ) => {
    const query = useQueryCommon<IChat>({
      queryKey: [keyRQ.messageDetail, id],
      url: `chat/${id}`,
      ...option,
    });

    return {
      ...query,
      data: query.data,
    };
  },
};
