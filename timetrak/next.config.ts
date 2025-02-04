import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Ensures proper deployment
  trailingSlash: true, // Fixes route issues
};

export default nextConfig;
