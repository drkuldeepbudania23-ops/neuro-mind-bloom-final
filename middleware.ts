import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAppUserAgent } from "./lib/appShell";

/**
 * Private areas (doctor dashboard, login, video rooms) must never be cached by
 * browsers or CDNs because they can show patient information.
 *
 * NOTE: the previous middleware forced `Content-Type: text/html` and `no-store`
 * on EVERY route, including /sitemap.xml, /robots.txt and images in /public.
 * That served the sitemap and robots file with the wrong content type (bad for
 * Google) and disabled caching for public pages. Security headers now live in
 * next.config.ts; this middleware only handles private-route caching.
 *
 * Residents' learning content is app-only: in a normal browser /residents/app
 * redirects to /residents (get-the-app page) and the content APIs refuse.
 * Subscription purchase (/residents/join) stays website-only.
 */
const PRIVATE_PREFIXES = ["/doctor", "/login", "/video", "/verify", "/residents"];
const APP_ONLY_PAGES = ["/residents/app"];
const APP_ONLY_APIS = ["/api/residents/content"];
// Purchases are website-only: the app must never sell (app store rules).
const WEB_ONLY_PAGES = ["/residents/join"];
const WEB_ONLY_APIS = ["/api/residents/order"];

const matches = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const inApp = isAppUserAgent(request.headers.get("user-agent"));

  const refuse = (error: string) =>
    Response.json(
      { ok: false, error },
      { status: 403, headers: { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow", Vary: "User-Agent" } }
    );
  if (!inApp && matches(pathname, APP_ONLY_APIS)) return refuse("app-only");
  if (inApp && matches(pathname, WEB_ONLY_APIS)) return refuse("web-only");

  let response = NextResponse.next();
  if (!inApp && matches(pathname, APP_ONLY_PAGES)) {
    response = NextResponse.redirect(new URL("/residents", request.url));
  } else if (inApp && matches(pathname, WEB_ONLY_PAGES)) {
    response = NextResponse.redirect(new URL("/residents/app", request.url));
  }

  if (matches(pathname, PRIVATE_PREFIXES)) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  // Responses differ for the app and the browser; never let a cache mix them up.
  if (pathname.startsWith("/residents") || pathname.startsWith("/api/residents")) {
    response.headers.set("Vary", "User-Agent");
  }

  return response;
}

export const config = {
  matcher: [
    "/doctor/:path*",
    "/login/:path*",
    "/login",
    "/video/:path*",
    "/verify/:path*",
    "/residents",
    "/residents/:path*",
    "/api/residents/content",
    "/api/residents/content/:path*",
    "/api/residents/order",
  ],
};
