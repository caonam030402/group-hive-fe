import type {
  MutationOptions,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errors: string;
}

export interface ISuccessResponse<Data> {
  status: number;
  payload: Data;
}

export interface IHttpResponse<Data> {
  ok: boolean;
  status: number;
  payload: Data;
}
interface IRequestInit extends RequestInit {
  body?: unknown;
}

interface IPagination {
  page: number;
  limit: number;
}

interface IPaginationResponse<T> {
  data: T[];
  hasNextPage: boolean;
  pagination?: IPagination;
}

type IOptionRQCustom = { expendQueryKey?: string[]; url?: string };

type IOptionRQ = IOptionRQCustom &
  Omit<UseQueryOptions<any>, "queryKey" | "queryFn">;

type IOptionRQI = IOptionRQCustom &
  Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn">;

type IOptionRQMutation = MutationOptions;

interface IQueryGetApi {
  pagination?: IPagination;
  filterRelational?: {
    field: string;
    value: string;
  };
  filterBy?: {
    field: string;
    value: string | number | boolean;
  };
  order?: {
    field: string;
    value: string;
  };
  search?: {
    field: string;
    value: string;
  };
}

interface IPropModal {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
