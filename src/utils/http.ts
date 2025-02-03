import Cookies from "js-cookie";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

import { ENameCookie } from "@/constants/common";
import { HttpStatusCode } from "@/constants/httpStatusCode";
import { Env } from "@/libs/env";
import type { IErrorResponse, IRequestInit } from "@/types";

import { isClient } from "./common";

export class HttpError extends Error {
  data: IErrorResponse;

  constructor(message: string, data: IErrorResponse) {
    super(message);
    this.name = "HttpError";
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options: IRequestInit,
) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  try {
    const baseUrl = Env.NEXT_PUBLIC_API_URL;

    let token;

    if (isClient) {
      token = Cookies.get(ENameCookie.ACCESS_TOKEN);
    } else {
      const session = isClient ? await getSession() : null;
      token = session?.user?.token;
    }

    const body = options?.body ? JSON.stringify(options.body) : undefined;

    const baseHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        ...baseHeader,
        ...options?.headers,
      },
      body,
      signal,
    });

    let payload: Response | null = null;

    if (response.status !== HttpStatusCode.NoContent) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        payload = await response.json();
      } else {
        payload = null;
      }
    }
    const statusError = ![
      HttpStatusCode.Ok,
      HttpStatusCode.NoContent,
      HttpStatusCode.Created,
    ].includes(response.status);
    if (isClient && statusError) {
      const payloadErr = payload as IErrorResponse;
      throw payloadErr;
    }

    const responsePayload = payload as Response;
    const data = {
      ok: response.ok,
      status: response.status,
      payload: responsePayload,
    };

    return data;
  } catch (e) {
    const payloadErr = e as IErrorResponse;
    if (isClient) {
      payloadErr.message && toast.error(payloadErr.message);
    }
    const err = new HttpError("Error", payloadErr);
    throw (err.data = payloadErr);
  }
};

const http = {
  get: <Response>(url: string, options?: IRequestInit) =>
    request<Response>("GET", url, options || {}),
  post: <Response>(url: string, options: IRequestInit) =>
    request<Response>("POST", url, options),
  put: <Response>(url: string, options: IRequestInit) =>
    request<Response>("PUT", url, options),
  patch: <Response>(url: string, options: IRequestInit) =>
    request<Response>("PATCH", url, options),
  delete: <Response>(url: string, options: IRequestInit) =>
    request<Response>("DELETE", url, options),
};

export default http;
