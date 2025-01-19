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

export const workspaceSendMailInvite = (listEmail: IUser["email"][]) => {
  return http.post<null>("workspaces/invite-send-mail", {
    body: {
      emails: listEmail,
    },
  });
};

export const inviteWorkspaceCreate = (listEmail: IUser["email"][]) => {
  return http.post<null>("workspaces/create-invite", {
    body: {
      emails: listEmail,
    },
  });
};

export const inviteWorkspaceGetOne = (id: IWorkspace["id"]) => {
  return http.get<IInviteWorkspace>(`workspaces/get-invite/${id}`);
};
