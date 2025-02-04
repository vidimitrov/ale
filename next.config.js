/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure TypeScript is used for all files
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure page extensions to only allow TypeScript
  pageExtensions: ["ts", "tsx"],
};

module.exports = nextConfig;
