import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

import { HttpStatusCode } from "@/constants/httpStatusCode";
import { Env } from "@/libs/env";
import type { IErrorResponse, IRequestInit } from "@/types";

const isClient = typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: IRequestInit,
) => {
  try {
    const baseUrl = Env.NEXT_PUBLIC_API_URL;
    const session = isClient ? await getSession() : null;
    const body = options?.body ? JSON.stringify(options.body) : undefined;

    const baseHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    };

    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        ...baseHeader,
        ...options?.headers,
      },
      body,
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
      toast.error(payloadErr.errors || payloadErr.message);
    }

    const data = {
      ok: response.ok,
      status: response.status,
      payload,
    };

    return data;
  } catch (e) {
    isClient && toast.error("Something went wrong");
    return {
      ok: false,
      status: 500,
      payload: null,
    };
  }
};

const http = {
  get: <Response>(url: string, options?: IRequestInit) =>
    request<Response>("GET", url, options || {}),
  post: <Response>(url: string, options: IRequestInit) =>
    request<Response>("POST", url, options),
  put: <Response>(url: string, options: IRequestInit) =>
    request<Response>("PUT", url, options),
  delete: <Response>(url: string, options: IRequestInit) =>
    request<Response>("DELETE", url, options),
};

export default http;
