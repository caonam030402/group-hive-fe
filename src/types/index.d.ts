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
  body: unknown;
}
