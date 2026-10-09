import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep dev assets out of the production build directory so a running
  // development server cannot serve stale or missing production assets.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  async redirects() {
    return [
      { source: "/reading-club/:path*", destination: "/#formats", permanent: true },
      { source: "/de/leseclub/:path*", destination: "/de#formate", permanent: true },
      { source: "/professional-german/business-german", destination: "/professional-german/technical-german", permanent: true },
      { source: "/de/deutsch-fuer-den-beruf/business-deutsch", destination: "/de/deutsch-fuer-den-beruf/technisches-deutsch", permanent: true },
    ];
  },
};
export default nextConfig;
