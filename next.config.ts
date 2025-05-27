import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/:shortCode([a-zA-Z0-9]{6,10})',
        destination: `${backendUrl}/:shortCode`,
      },
    ];
  },
};

export default nextConfig;
