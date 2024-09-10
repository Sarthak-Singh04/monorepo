/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["ui"],
  basePath: "/docs",
  assetPrefix: "/docs",
};

