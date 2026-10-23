import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Private areas (doctor dashboard, login, video rooms) must never be cached by
 * browsers or CDNs because they can show patient information.
 *
 * NOTE: the previous middleware forced `Content-Type: text/html` and `no-store`
 * on EVERY route, including /sitemap.xml, /robots.txt and images in /public.
 * That served the sitemap and robots file with the wrong content type (bad for
 * Google) and disabled caching for public pages. Security headers now live in
 * next.config.ts; this middleware only handles private-route caching.
 */
const PRIVATE_PREFIXES = ["/doctor", "/login", "/video", "/verify"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/doctor/:path*", "/login/:path*", "/login", "/video/:path*", "/verify/:path*"],
};
