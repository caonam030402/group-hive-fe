import { keyRQ } from "@/constants/keyRQ";
import { useQueryCommon, useQueryInfiniteCommon } from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse, IQueryGetApi } from "@/types";
import type { IChat, IMessage } from "@/types/chat";
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
  useGetAllMessage: (queryS: IQueryGetApi, option?: IOptionRQ) => {
    const queryString = buildQueryParamsGet(queryS);
    const query = useQueryInfiniteCommon<IPaginationResponse<IMessage>>({
      queryKey: [keyRQ.message],
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
