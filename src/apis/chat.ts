import type { IPaginationResponse, IQueryGetApi } from "@/types";
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
