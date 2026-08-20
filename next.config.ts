import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prevent stale fetch results while testing Shopify changes with HMR.
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
