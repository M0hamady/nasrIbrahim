import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["firebase"] },
};
export default nextConfig;
