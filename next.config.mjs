/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the Cloudflare quick-tunnel host to load /_next dev resources.
  // Only affects `next dev`; ignored in production builds.
  allowedDevOrigins: ['*.trycloudflare.com'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
