import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Baked into the bundle so the prerendered HTML and the first client render agree.
  env: { NEXT_PUBLIC_BUILD_TIME: process.env.SIMULATE_NOW || new Date().toISOString() },
  async headers() {
    return [
      {
        source: '/admin',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/getting-started',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
