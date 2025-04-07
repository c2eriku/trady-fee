import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/tradyfee" : "",
  assetPrefix: isProd ? "/tradyfee/" : "",
  output: isProd ? "export" : undefined,
  trailingSlash: true,
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
