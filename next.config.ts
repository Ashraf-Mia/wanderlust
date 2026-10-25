import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      // { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" },
      // { protocol: "https", hostname: "cdn.sanity.io" },
      // { protocol: "https", hostname: "d2csxpduxe849s.cloudfront.net" },
      // { protocol: "https", hostname: "www.thoughtco.com" },
      // { protocol: "https", hostname: "www.anubhavvacations.in" },
      // { protocol: "https", hostname: "s7ap1.scene7.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
