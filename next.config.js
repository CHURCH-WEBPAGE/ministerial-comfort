/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable optimization for faster loading on Netlify
    // Images will be served directly from public folder
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

