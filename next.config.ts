import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prevent stale fetch results while testing Shopify changes with HMR.
    serverComponentsHmrCache: false,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
