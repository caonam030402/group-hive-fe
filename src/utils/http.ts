import Cookies from "js-cookie";

import { ENameCookie } from "@/constants/common";
import { Env } from "@/libs/env";
import type { IRequestInit } from "@/types";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: IRequestInit,
) => {
  const baseUrl = Env.NEXT_PUBLIC_API_URL;
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const clientToken = Cookies.get(ENameCookie.ACCESS_TOKEN);

  const baseHeader = {
    "Content-Type": "application/json",
    Authorization: clientToken !== "" ? `Bearer ${clientToken}` : "",
  };

  const response = await fetch(baseUrl + url, {
    method,
    headers: {
      ...baseHeader,
      ...options.headers,
    },
    body,
  });

  let payload: Response | null = null;

  if (response.status !== 204) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      payload = await response.json();
    } else {
      payload = null;
    }
  }

  const data = {
    ok: response.ok,
    status: response.status,
    payload,
  };

  return data;
};

const http = {
  get: <Response>(url: string, options: IRequestInit) =>
    request<Response>("GET", url, options),
  post: <Response>(url: string, options: IRequestInit) =>
    request<Response>("POST", url, options),
  put: <Response>(url: string, options: IRequestInit) =>
    request<Response>("PUT", url, options),
  delete: <Response>(url: string, options: IRequestInit) =>
    request<Response>("DELETE", url, options),
};

export default http;
