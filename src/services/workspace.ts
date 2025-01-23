import { useMutation } from "@tanstack/react-query";

import { workSpaceKeyRQ } from "@/constants/keyRQ";
import useQueryCommon from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse } from "@/types";
import http from "@/utils/http";

export const workspaceService = {
  useGetInviteById: (id: IWorkspace["id"] | null, option?: IOptionRQ) => {
    const query = useQueryCommon({
      queryKey: [workSpaceKeyRQ.invite, ...(option?.expendQueryKey ?? [])],
      queryFn: () => http.get<IInviteWorkspace>(`workspaces/invite/${id}`),
      ...option,
    });
    return {
      ...query,
      data: query.data?.payload,
    };
  },
  useGet: (option?: IOptionRQ) => {
    const query = useQueryCommon({
      queryKey: [workSpaceKeyRQ.workspace],
      queryFn: () => http.get<IPaginationResponse<IWorkspace>>("workspaces"),
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
};
