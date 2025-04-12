import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "openapi.twse.com.tw",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
