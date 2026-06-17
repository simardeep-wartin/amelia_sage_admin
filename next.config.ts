import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone/server.js — a minimal self-contained server for EC2/PM2 deploys.
  // Keeps the runtime footprint small; build is done in CI/locally, never on the 2GB instance.
  output: "standalone",
};

export default nextConfig;
