import type { NextConfig } from "next";

/**
 * Content-Security-Policy is shipped in REPORT-ONLY mode first. Check the
 * browser console on a preview deployment for violations, then switch the
 * header name to "Content-Security-Policy" to enforce it.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://apis.google.com https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://api.razorpay.com https://lumberjack.razorpay.com wss://*.firebaseio.com https://www.google.com https://content-firebaseappcheck.googleapis.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://meet.jit.si https://8x8.vc https://*.daily.co https://api.razorpay.com https://checkout.razorpay.com https://*.firebaseapp.com https://www.google.com",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.razorpay.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Camera + microphone are needed by the video consultation page only.
  { key: "Permissions-Policy", value: "camera=(self \"https://meet.jit.si\" \"https://8x8.vc\" \"https://*.daily.co\"), microphone=(self \"https://meet.jit.si\" \"https://8x8.vc\" \"https://*.daily.co\"), geolocation=(), payment=(self \"https://api.razorpay.com\")" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
