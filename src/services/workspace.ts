import { useMutation } from "@tanstack/react-query";

import { keyRQ } from "@/constants/keyRQ";
import { useQueryCommon, useQueryInfiniteCommon } from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse } from "@/types";
import http from "@/utils/http";

export const workspaceService = {
  useGetInviteById: (id: IWorkspace["id"] | null, option?: IOptionRQ) => {
    const query = useQueryCommon<IInviteWorkspace>({
      queryKey: [keyRQ.invite, ...(option?.expendQueryKey ?? [])],
      url: `workspaces/invite/${id}`,
      ...option,
    });
    return {
      ...query,
      data: query.data,
    };
  },
  useGet: (option?: IOptionRQ) => {
    const query = useQueryInfiniteCommon<IPaginationResponse<IWorkspace>>({
      queryKey: [keyRQ.workspace],
      url: "workspaces",
      ...option,
    });

    return {
      ...query,
      data: query.data?.data,
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
  useJoin: () => {
    return useMutation({
      mutationFn: async (body: {
        workspaceId: IWorkspace["id"];
        userId: IUser["id"];
      }) => {
        return http.post<null>("workspaces/join", {
          body,
        });
      },
    });
  },
  useGetMembers: (workspaceId: IWorkspace["id"], option?: IOptionRQ) => {
    type Response = IPaginationResponse<IUser>;
    const query = useQueryInfiniteCommon<Response>({
      queryKey: [keyRQ.member],
      url: `workspaces/members?workspaceId=${workspaceId}`,
      ...option,
    });

    return {
      ...query,
      data: query.data?.data,
    };
  },
};
