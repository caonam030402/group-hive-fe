"use client";

import Cookies from "js-cookie";
import { io } from "socket.io-client";

import { ENameCookie } from "@/constants";

export const socket = io("http://localhost:3002", {
  extraHeaders: {
    authorization: Cookies.get(ENameCookie.ACCESS_TOKEN) || "",
  },
});
