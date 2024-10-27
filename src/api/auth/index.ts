"use server";

import type { ISuccessResponse } from "@/types";
import type { IAuth, IAuthResponse } from "@/types/auth";
import http from "@/utils/http";

import type {
  IRequestConfirmOtp,
  IRequestGenerateOtp,
  IResponseGenerateOtp,
} from "./type";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post<{
    id: number;
  }>("/api/v1/auth/email/register", {
    body: body as any,
  });
};

export const authGenerateOtp = (body: IRequestGenerateOtp) => {
  return http.post<ISuccessResponse<IResponseGenerateOtp>>("/api/v1/otps", {
    body: body as any,
  });
};

export const authConfirmOtp = (body: IRequestConfirmOtp) => {
  return http.post<IAuthResponse>("/api/v1/auth/email/confirm/otp", {
    body: body as any,
  });
};
