import React from 'react'
import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import './global.css'
import ProvideSession from '../libs/components/shared/layouts/session-provider'
import { Toaster } from '../libs/components/shared/ui/toaster'
import { cn } from '../libs/utils/cn'

export const metadata: Metadata = {
  title: 'Notebook service',
  description: 'Notebook service',
  manifest: '/manifest.json'
}

const ubuntu = Ubuntu({
  weight: ['400', '500', '700'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={cn(ubuntu.className, 'bg-[#F3F6FB]')}>
        <ProvideSession>{children}</ProvideSession>
        <Toaster />
      </body>
    </html>
  )
}
