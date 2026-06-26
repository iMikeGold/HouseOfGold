import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    instrumentationHook: false, // Disables the feature causing the look-up error
  },
};
export default nextConfig;
