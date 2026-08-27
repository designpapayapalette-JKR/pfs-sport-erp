import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dealer/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
