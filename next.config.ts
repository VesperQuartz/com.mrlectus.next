import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    authInterrupts: true,
    typedEnv: true,
    optimizeCss: true,
    // ppr: "incremental",
    reactCompiler: true,
  },
  allowedDevOrigins: ["mrlectus.local"],
};

export default nextConfig;
