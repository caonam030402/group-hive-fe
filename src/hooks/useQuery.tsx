import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

export default function useQueryCommon<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  option: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> {
  const query = useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24,
    ...option,
  });

  return query;
}
