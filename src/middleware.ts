import { User } from 'lucia';
import { defaultLocale, locales } from "@/translation/i18n";
import createIntlMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { cache } from "react";

const getProfile = cache(async (origin: string): Promise<User | undefined> => {
  const sessionId = cookies().get("auth_session")?.value
  if (sessionId) {
    const res = await fetch(`${origin}/api/profile`, {
      headers: {
        "Authorization": `Bearer ${sessionId}`
      }
    })
    return await res.json()
  }
})

const intlMiddleware = createIntlMiddleware({ locales, defaultLocale });
export const middleware = async (req: NextRequest) => {
  const sessionId = cookies().get("auth_session")?.value
  // const user = await getProfile(req.nextUrl.origin); // in case we want to authorize by role
  const url = req.nextUrl;
  const locale = cookies().get("NEXT_LOCALE")?.value || defaultLocale;
  const publicPath = [`/`]; // add your public path here
  if (!sessionId && !url.pathname.includes("/auth")) {
    if (!publicPath.includes(url.pathname.replace(locale, ""))) { // check if go to public route
      req.nextUrl.pathname = `/${locale}/auth/login`;
    }
  }
  return intlMiddleware(req);
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|vercel.svg|no-avatar.png).*)", // add image name here to work
    "/(km|en)/:path*",
  ],
};
