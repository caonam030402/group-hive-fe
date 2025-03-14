import { useMutation } from "@tanstack/react-query";

import { keyRQ } from "@/constants/keyRQ";
import type { EScopeDocsHub } from "@/enums/docsHub";
import { useQueryInfiniteCommon } from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse, IQueryGetApi } from "@/types";
import type { ICreateDocsHub, IDocsHub } from "@/types/docsHub";
import { buildQueryParamsGet } from "@/utils/buildQueryParams";
import http from "@/utils/http";

export const docsHubService = {
  useCreateDocs: () => {
    return useMutation({
      mutationFn: async (body: ICreateDocsHub) => {
        return http.post<IDocsHub>("docs-hubs", {
          body,
        });
      },
    });
  },
  useGetAllDocs: (
    queryS: IQueryGetApi & {
      userId: number;
      workspaceId: string;
      isShared: boolean;
      scope: EScopeDocsHub;
    },
    option?: IOptionRQ,
  ) => {
    const queryString = buildQueryParamsGet(queryS, {
      userId: queryS.userId,
      workspaceId: queryS.workspaceId,
      isShared: queryS.isShared,
      scope: queryS.scope,
    });

    const query = useQueryInfiniteCommon<IPaginationResponse<IDocsHub>>({
      queryKey: [keyRQ.docsHub, ...(option?.expendQueryKey || [])],
      url: `docs-hubs?${queryString}`,
      ...option,
    });
    return {
      ...query,
      data: query.data?.data,
    };
  },
};
