/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/news', destination: '/events', permanent: true },
      { source: '/news/register/:slug', destination: '/events/register/:slug', permanent: true },
    ];
  },
};

module.exports = nextConfig;

