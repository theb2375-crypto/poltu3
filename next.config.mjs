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
  // The Flutter web app lives in public/app (built with --base-href /app/).
  // The public folder doesn't auto-serve directory indexes, so route the
  // bare /app paths to its index.html.
  async rewrites() {
    return [
      { source: '/app', destination: '/app/index.html' },
      { source: '/app/', destination: '/app/index.html' },
    ]
  },
}

export default nextConfig
