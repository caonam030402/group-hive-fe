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
  pagination: IPagination;
}

interface IQueryGetApi {
  pagination?: IPagination;
  filterRelational?: {
    field: string;
    value: string;
  };
  filterBy?: {
    field: string;
    value: string;
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
