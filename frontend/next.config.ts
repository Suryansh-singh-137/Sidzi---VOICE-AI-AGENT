import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/calls/:path*",
        destination: "http://127.0.0.1:8000/api/calls/:path*",
      },
    ];
  },
};

export default nextConfig;
