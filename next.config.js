/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable optimization - images are too large, optimization is slow
    // Serve directly for faster initial load
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
}

module.exports = nextConfig

