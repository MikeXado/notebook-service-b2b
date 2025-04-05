import React from 'react'
import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import './global.css'
import ProvideSession from '../../libs/components/shared/layouts/session-provider'
import { Toaster } from '../../libs/components/shared/ui/toaster'
import { cn } from '../../libs/utils/cn'
import { Analytics } from '@vercel/analytics/next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '../../libs/service/i18n/routing'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Notebook service',
  description: 'Notebook service',
  manifest: '/manifest.json'
}

const ubuntu = Ubuntu({
  weight: ['400', '500', '700'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  preload: true
})

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={cn(ubuntu.className, 'bg-[#F3F6FB]')}>
        <NextIntlClientProvider>
          <ProvideSession>{children}</ProvideSession>
          <Toaster />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
