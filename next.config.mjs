/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: 'https://b2b.notebook-service.com.ua/api/:path*'
      },
      {
        source: '/media/:path*',
        destination: 'https://b2b.notebook-service.com.ua/media/:path*'
      },

      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ]
  }
}

export default nextConfig
