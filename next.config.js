const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  // Ensure TypeScript is used for all files
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure page extensions to only allow TypeScript
  pageExtensions: ["ts", "tsx"],
});

module.exports = nextConfig;
