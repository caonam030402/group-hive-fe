import { useMutation } from "@tanstack/react-query";

import type { ISuccessResponse } from "@/types";
import type {
  IAuth,
  IAuthResponse,
  IRequestConfirmOtp,
  IRequestGenerateOtp,
  IResponseGenerateOtp,
} from "@/types/auth";
import http from "@/utils/http";

export const authService = {
  useRegisterWithEmail: () => {
    return useMutation({
      mutationFn: async (body: IAuth) =>
        http.post<{
          userId: number;
        }>("auth/email/register", {
          body,
        }),
    });
  },
  useGenerateOtp: () => {
    return useMutation({
      mutationFn: (body: IRequestGenerateOtp) => {
        return http.post<ISuccessResponse<IResponseGenerateOtp>>("otps", {
          body,
        });
      },
    });
  },
  // Server side
  loginWithEmail: (body: IAuth) => {
    return http.post<{
      id: number;
    }>("auth/email/login", {
      body,
    });
  },
  refreshToken: (refreshToken: string) => {
    return http.post<IAuthResponse>("auth/refresh", {
      body: {},
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },
  loginGoogle: (idToken?: string) => {
    return http.post<IAuthResponse>("auth/google/login", {
      body: {
        idToken,
      },
    });
  },
  logout: () => {
    return http.post<IAuthResponse>("auth/logout", { body: {} });
  },
  confirmOtp: (body: IRequestConfirmOtp) => {
    return http.post<IAuthResponse>("auth/email/confirm/otp", {
      body,
    });
  },
};
