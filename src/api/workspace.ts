import type { IPaginationResponse, ISuccessResponse } from "@/types";
import http from "@/utils/http";

export const workspaceCreate = (body: IWorkspaceCreateBody) => {
  return http.post<ISuccessResponse<null>>("workspaces", {
    body,
  });
};

export const workspaceGet = () => {
  return http.get<IPaginationResponse<IWorkspace>>("workspaces");
};
