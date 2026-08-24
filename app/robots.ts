import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/doctor/", "/login/"],
    },
    sitemap: "https://neuromindbloom.com/sitemap.xml",
  };
}
