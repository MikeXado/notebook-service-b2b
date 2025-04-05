/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env['MEDIA_HOSTNAME']
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: process.env['API_URL'] + '/:path*'
      },
      {
        source: '/media/:path*',
        destination: process.env['NEXT_PUBLIC_MEDIA_URL'] + '/:path*'
      }
    ]
  }
}

const withNextIntl = createNextIntlPlugin('./libs/service/i18n/request.ts')

export default withSentryConfig(withNextIntl(nextConfig), {
  silent: true,
  org: 'notebook-service-0v',
  project: 'notebook-service-0v',
  authToken: process.env['SENTRY_AUTH_TOKEN'],
  sentryUrl: 'https://notebook-service-0v.sentry.io/',
  widenClientFileUpload: true,
  hideSourceMaps: true,
  reactComponentAnnotation: {
    enabled: true
  },
  silent: !process.env.CI,
  disableLogger: true,
  automaticVercelMonitors: true,
  __SENTRY_DEBUG__: true
})
