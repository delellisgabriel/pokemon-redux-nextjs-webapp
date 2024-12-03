import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
