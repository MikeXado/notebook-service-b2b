'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function EmptyCartPlaceholder() {
  const t = useTranslations('cart')
  return (
    <div className="bg-white py-5 rounded-lg px-2 flex items-center gap-1">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> {t('empty')}{' '}
      </p>
      <Link className="text-primary text-sm hover:underline" href="/showcase">
        {t('back')}
      </Link>
    </div>
  )
}
