'use client'
import { Check, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export function OrderStatus({ status }: { status: number }) {
  const t = useTranslations('orders')
  return (
    <>
      {status ? (
        <div className="flex items-center gap-2">
          <Check className="text-green-500" /> {t('status_options.completed')}{' '}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Loader className="text-orange-500" />
          {t('status_options.in_progress')}
        </div>
      )}
    </>
  )
}
