import { useMutation } from "@tanstack/react-query";

import { keyRQ } from "@/constants/keyRQ";
import { useQueryInfiniteCommon } from "@/hooks/useQuery";
import type { IOptionRQ, IPaginationResponse, IQueryGetApi } from "@/types";
import type { IMessage } from "@/types/chat";
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
  useGetAllDocsHub: (queryS: IQueryGetApi, option?: IOptionRQ) => {
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
};
