import { useMutation, useQuery } from "@tanstack/react-query";

import { workSpaceKeyRQ } from "@/constants/keyRQ";
import type { IOptionRQ, IPaginationResponse } from "@/types";
import http from "@/utils/http";

export const workspaceService = {
  useGetInviteById: (id: IWorkspace["id"], option?: IOptionRQ) => {
    const query = useQuery({
      queryKey: [workSpaceKeyRQ.invite],
      queryFn: () => http.get<IInviteWorkspace>(`workspaces/invite/${id}`),
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
  useUpdateInvite: () => {
    return useMutation({
      mutationFn: (id: IWorkspace["id"]) => {
        return http.put<null>("workspaces/invite", {
          body: {
            workspace: {
              id,
            },
          },
        });
      },
    });
  },
  useCreate: () => {
    return useMutation({
      mutationFn: async (body: IWorkspaceCreateBody) => {
        return http.post<null>("workspaces", { body });
      },
    });
  },
  useSendMailsInvite: () => {
    return useMutation({
      mutationFn: async (listEmail: IUser["email"][]) => {
        return http.post<null>("workspaces/invite-send-mail", {
          body: {
            emails: listEmail,
          },
        });
      },
    });
  },
};
