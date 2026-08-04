import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/routing";

const localeCookie = "NEXT_LOCALE";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split("/");

  if (!isLocale(locale)) {
    const preferredLocale = request.cookies.get(localeCookie)?.value;
    const targetLocale = isLocale(preferredLocale ?? "")
      ? preferredLocale
      : defaultLocale;
    const url = request.nextUrl.clone();

    url.pathname = `/${targetLocale}${pathname}`;

    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  response.cookies.set(localeCookie, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
