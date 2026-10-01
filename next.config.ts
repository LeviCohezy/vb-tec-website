import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>; set PAGES_BASE_PATH in CI.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Folder-style URLs (/blog/x/index.html) work on any static host.
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
