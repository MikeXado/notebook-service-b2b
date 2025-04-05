'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function EmptyResult() {
  const t = useTranslations('empty')
  return (
    <div className="bg-white py-5 rounded-lg px-2">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> {t('title')}
      </p>
    </div>
  )
}
