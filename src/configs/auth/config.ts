import type { JWT, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { listCredential } from "@/constants/auth";
import { ENameCookie } from "@/constants/common";
import { authService } from "@/services/auth";
import type { IErrorResponse, IHttpResponse } from "@/types";
import type { IAuthResponse } from "@/types/auth";
import { setCookies } from "@/utils";

const mapUserToToken = ({ data, token }: { data: User; token: JWT }) => ({
  ...token,
  user: {
    ...data,
    token: data.token,
    refreshToken: data.refreshToken,
    tokenExpires: data.tokenExpires,
  },
});

const refetchToken = async (token: JWT) => {
  const { payload, ok } = await authService.refreshToken(
    token.user.refreshToken,
  );
  if (ok) {
    return mapUserToToken({
      data: {
        ...token.user,
        token: payload?.token,
        refreshToken: payload?.refreshToken,
        tokenExpires: payload?.tokenExpires,
      },
      token,
    });
  }
  return null;
};

export default {
  // trustHost: process.env.NODE_ENV === "development",
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const { payload, ok } = (await listCredential(
          credentials,
        )) as IHttpResponse<IAuthResponse>;
        if (!ok) {
          const resErr = payload as unknown as IErrorResponse | null;

          const user: User = {
            error: resErr?.message || JSON.stringify(resErr?.errors),
          };
          return user;
        }

        setCookies({
          value: payload.token || "",
          name: ENameCookie.ACCESS_TOKEN,
          expires: payload.tokenExpires || 0,
        });

        const user: User = {
          isVerified: payload.user?.isVerified,
          id: payload.user?.id?.toString(),
          token: payload.token,
          refreshToken: payload.refreshToken,
          tokenExpires: payload.tokenExpires,
        };
        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    session: async ({ token, session }) => {
      const tokenCustom = token as unknown as JWT;
      return {
        ...session,
        user: tokenCustom.user,
      };
    },
    signIn: async ({ user }) => {
      if (user.error) {
        throw new Error(user.error || "error");
      }
      return true;
    },

    jwt: async ({ token, user, account }) => {
      const providerType = account?.provider;

      const tokenCustom = token as unknown as JWT;

      if (providerType === "google") {
        const res = await authService.loginGoogle(account?.id_token);
        const userRes = res.payload?.user as User;
        return mapUserToToken({ data: userRes, token: tokenCustom });
      }

      if (user) {
        return mapUserToToken({ data: user, token: tokenCustom });
      }

      if (Date.now() < tokenCustom.user.tokenExpires) {
        return token;
      }

      const refreshedToken = await refetchToken(tokenCustom);
      return refreshedToken ?? null;
    },
  },
} satisfies NextAuthConfig;
