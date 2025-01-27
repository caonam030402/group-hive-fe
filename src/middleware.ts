import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import authConfig from "./configs/auth/config";
import { AppConfig } from "./configs/main/appConfig";
import { PATH, PUBLIC_PAGES } from "./constants/common";
import { EVerified } from "./enums/auth";

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const { auth } = NextAuth(authConfig);

const authHandler = auth((req) => {
  const publicPathnameRegex = RegExp(
    `^(/(${AppConfig.locales.join("|")}))?(${PUBLIC_PAGES.flatMap((p) =>
      p === "/" ? ["", "/"] : `${p}(/.*)?`,
    ).join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isProtected = !isPublicPage && !req.auth;
  const isRejected =
    req.auth &&
    (req.nextUrl.pathname === PATH.LOGIN ||
      req.nextUrl.pathname === PATH.REGISTER);

  const isVerified = req.auth?.user?.isVerified === EVerified.VERIFIED;

  if (isProtected) {
    const newUrl = new URL(PATH.LOGIN, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (isRejected) {
    const newUrl = new URL(PATH.HOME, req.nextUrl.origin);

    if (
      !isVerified &&
      req.nextUrl.pathname !== PATH.VERIFY &&
      req.nextUrl.pathname !== PATH.LOGIN
    ) {
      return Response.redirect(new URL(PATH.VERIFY, req.nextUrl.origin));
    }

    return Response.redirect(newUrl);
  }

  return intlMiddleware(req);
});

export default auth(async function middleware(req: NextRequest) {
  return (authHandler as any)(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
