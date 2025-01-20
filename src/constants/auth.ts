import { authService } from "@/services/auth";

export enum ETriggerCredentials {
  LOGIN = "login",
  OTP = "otp",
}

export const listCredential = (
  credentials: Partial<Record<string, unknown>>,
) => {
  const list = {
    [ETriggerCredentials.OTP]: authService.confirmOtp({
      user: {
        id: Number(credentials.userId),
      },
      code: Number(credentials.code),
    }),
    [ETriggerCredentials.LOGIN]: authService.loginWithEmail({
      email: credentials.email as string,
      password: credentials.password as string,
    }),
  };
  return list[credentials.trigger as ETriggerCredentials];
};
