import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { IOptionRQCustom } from "@/types";
import http from "@/utils/http";

export function useQueryCommon<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(
  option: UseQueryOptions<TQueryFnData, TError, TData> & IOptionRQCustom,
): UseQueryResult<TData, TError> {
  const query = useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () =>
      http
        .get<TQueryFnData>(option?.url || "")
        .then((response) => response.payload),
    ...option,
  });

  return query;
}

export function useQueryInfiniteCommon<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(
  option: UseQueryOptions<TQueryFnData, TError, TData> & IOptionRQCustom,
): UseQueryResult<TData, TError> {
  const query = useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () =>
      http
        .get<TQueryFnData>(option?.url || "")
        .then((response) => response.payload),
    ...option,
  });

  return query;
}
