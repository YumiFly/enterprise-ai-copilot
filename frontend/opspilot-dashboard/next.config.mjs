/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable external network requests during build
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
