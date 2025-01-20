import { useMutation, useQuery } from "@tanstack/react-query";

import { workSpaceKeyRQ } from "@/constants/keyRQ";
import type { IOptionRQ, IPaginationResponse, ISuccessResponse } from "@/types";
import http from "@/utils/http";

export const workspaceCreate = (body: IWorkspaceCreateBody) => {
  return http.post<ISuccessResponse<null>>("workspaces", {
    body,
  });
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

export const workspaceService = {
  useGetInviteById: (id: IWorkspace["id"], option?: IOptionRQ) => {
    const query = useQuery({
      queryKey: [workSpaceKeyRQ.invite],
      queryFn: () => http.get<IInviteWorkspace>(`workspaces/get-invite/${id}`),
      staleTime: 1000 * 60 * 60 * 24,
      ...option,
    });
    return {
      ...query,
      data: query.data?.payload,
    };
  },
  useGet: (option?: IOptionRQ) => {
    const query = useQuery({
      queryKey: [workSpaceKeyRQ.workspace],
      queryFn: () => http.get<IPaginationResponse<IWorkspace>>("workspaces"),
      staleTime: 1000 * 60 * 60 * 24,
      ...option,
    });

    return {
      ...query,
      data: query.data?.payload?.data,
    };
  },
  useCreateInvite: (listEmail: IUser["email"][], option?: IOptionRQ) => {
    const api = http.post<null>("workspaces/invite-send-mail", {
      body: {
        emails: listEmail,
      },
    });
    return useMutation({
      mutationFn: () => api,
      ...option,
    });
  },
  useCreate: () => {
    return useMutation({
      mutationFn: async (body: IWorkspaceCreateBody) => {
        const response = await http.post<null>("workspaces", { body });
        return response.payload;
      },
    });
  },
};
