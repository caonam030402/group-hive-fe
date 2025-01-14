"use server";

import type { ISuccessResponse } from "@/types";
import type {
  IAuth,
  IAuthResponse,
  IRequestConfirmOtp,
  IRequestGenerateOtp,
  IResponseGenerateOtp,
} from "@/types/auth";
import http from "@/utils/http";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post<{
    userId: number;
  }>("auth/email/register", {
    body,
  });
};

export const authLoginWithEmail = (body: IAuth) => {
  return http.post<{
    id: number;
  }>("auth/email/login", {
    body,
  });
};

export const authGenerateOtp = (body: IRequestGenerateOtp) => {
  return http.post<ISuccessResponse<IResponseGenerateOtp>>("otps", {
    body,
  });
};

export const authConfirmOtp = (body: IRequestConfirmOtp) => {
  return http.post<IAuthResponse>("auth/email/confirm/otp", {
    body,
  });
};

export const authRefreshToken = (refreshToken: string) => {
  return http.post<IAuthResponse>("auth/refresh", {
    body: {},
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

export const authLogout = () => {
  return http.post<IAuthResponse>("auth/logout", { body: {} });
};

export const authLoginGoogle = (idToken?: string) => {
  return http.post<IAuthResponse>("auth/google/login", {
    body: {
      idToken,
    },
  });
};
