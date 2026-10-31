import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/assets/umbra-logo.png",
        destination: "/brand/umbra-logo.png",
      },
      {
        source: "/favicon.svg",
        destination: "/brand/favicon.png",
      },
    ];
  },
};

export default nextConfig;

