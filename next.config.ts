import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Supabase storage
      },
    ],
  },
  // For Turbopack (Next.js 16+), Leaflet should work without special config
  // Keeping webpack config for backward compatibility
  turbopack: {}, // Silence Turbopack warning
  webpack: (config) => {
    // Fix for Leaflet in Next.js (handles .mjs files correctly)
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    return config
  },
};

export default nextConfig;
