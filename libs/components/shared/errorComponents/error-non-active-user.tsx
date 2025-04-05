'use client'
import { useTranslations } from 'next-intl'

export function ErrorNotActiveUser() {
  const t = useTranslations('error_not_active')
  return (
    <div className="bg-white py-5 rounded-lg px-2">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> {t('title')}{' '}
      </p>
    </div>
  )
}
