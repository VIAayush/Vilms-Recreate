import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pages moved to the URLs in the site structure; the old ones (including
  // ad links like /demo?utm_source=…, whose query string is kept) still work.
  async redirects() {
    return [
      { source: "/demo", destination: "/book-a-demo", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The CRM must never be cached by a shared cache or indexed.
      {
        source: "/crm/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
