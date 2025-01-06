import type { JWT, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { authRefreshToken } from "@/api/auth";
import { listCredential } from "@/constants/auth";
import { ENameCookie } from "@/constants/common";
import type { IErrorResponse, IHttpResponse } from "@/types";
import type { IAuthResponse } from "@/types/auth";
import { setCookies } from "@/utils";

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
          ...payload.user,
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

    jwt: async ({ token, user }) => {
      const tokenCustom = token as unknown as JWT;
      if (user) {
        return {
          ...token,
          exp: user.tokenExpires,
          user: {
            ...user,
            token: user.token,
            refreshToken: user.refreshToken,
            tokenExpires: user.tokenExpires,
          },
        };
      }

      if (token.exp !== undefined && token.exp > Date.now() / 1000) {
        return token;
      }

      const { payload } = await authRefreshToken(tokenCustom.user.refreshToken);

      setCookies({
        value: payload!.token || "",
        name: ENameCookie.ACCESS_TOKEN,
        expires: 30 * 24 * 60 * 60,
      });

      const newToken = {
        ...token,
        exp: payload!.tokenExpires || 0,
        user: {
          ...tokenCustom.user.user,
          token: payload!.token,
          refreshToken: payload!.refreshToken,
          tokenExpires: payload!.tokenExpires,
        },
      };

      return newToken;
    },
  },
} satisfies NextAuthConfig;
