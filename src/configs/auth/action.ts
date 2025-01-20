"use server";

import { ENameCookie, PATH } from "@/constants/common";
import { authService } from "@/services/auth";
import type { IAuthCredentials } from "@/types/auth";
import { clearCookies } from "@/utils/serverStorage";

import { signIn, signOut as _signOut } from "./auth";

export async function signInWithOAuth({
  provider,
}: {
  provider: "google" | "facebook";
}) {
  await signIn(provider, { redirectTo: "/" });
}

export async function authCredential<T>(body: IAuthCredentials & T) {
  try {
    return await signIn("credentials", body);
  } catch (error: any) {
    return {
      error: error.cause?.err?.message || error.cause,
    };
  }
}

export async function signOut() {
  clearCookies({ key: ENameCookie.ACCESS_TOKEN });
  await authService.logout();
  await _signOut({ redirectTo: PATH.LOGIN });
}
