import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/doctor/", "/login", "/api/", "/video/", "/pay", "/hi/pay", "/residents/app", "/residents/login"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
