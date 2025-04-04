/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs'

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

export default withSentryConfig(
  withSentryConfig(nextConfig, {
    silent: true,
    org: 'notebook-service-0v',
    project: 'notebook-service-0v',
    authToken: process.env['SENTRY_AUTH_TOKEN'],
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    __SENTRY_DEBUG__: true
  }),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: 'notebook-service-0v',
    project: 'notebook-service-0v',
    sentryUrl: 'https://notebook-service-0v.sentry.io/',

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true
    },

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
)
