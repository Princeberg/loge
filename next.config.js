/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
         port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      }
    ],
    // Ajout de configurations importantes
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Désactiver l'optimisation en développement si les problèmes persistent
    unoptimized: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  // Ajout des headers de sécurité pour les images
  async headers() {
    return [
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          dns: false,
          net: false,
          tls: false
        }
      };
    }
    
    // Optimisation pour les images
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
      type: 'asset/resource',
    });
    
    return config;
  }
};

export default nextConfig;
