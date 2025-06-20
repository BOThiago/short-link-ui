import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    return [
      {
        source: '/:path*',
        destination: `${backendUrl}/:path*`,
      },
      {
        source: '/:shortCode([a-zA-Z0-9]{6,10})',
        destination: `${backendUrl}/:shortCode`,
      },
    ];
  },
};

export default nextConfig;
