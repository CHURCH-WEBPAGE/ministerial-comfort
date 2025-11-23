/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization for Netlify
    // Set to true if images still don't load on Netlify
    unoptimized: process.env.NODE_ENV === 'production' ? false : false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
}

module.exports = nextConfig

