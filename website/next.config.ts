import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/breakdown",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/breakdown#controls",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
