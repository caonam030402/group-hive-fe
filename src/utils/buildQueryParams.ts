import type { IQueryGetApi } from "@/types";

export const buildQueryParamsGet = (query: IQueryGetApi, addObject?: {}) => {
  const params = new URLSearchParams();

  const fields = {
    page: query.pagination?.page || 1,
    limit: query.pagination?.limit || 50,
    filterRelationalField: query.filterRelational?.field,
    filterRelationalValue: query.filterRelational?.value,
    filterByField: query.filterBy?.field,
    filterByValue: query.filterBy?.value,
    searchField: query.search?.field,
    searchValue: query.search?.value,
    orderField: query.order?.field,
    orderValue: query.order?.value,
    ...addObject,
  };

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};
