import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained bundle in .next/standalone.
  // This is required for the Docker multi-stage build to work optimally.
  output: "standalone",
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
