'use client'

import React from 'react'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function Breadcrumbs() {
  const pathname = usePathname()
  const currentPage = pathname.split('/showcase/').pop() || ''
  const t = useTranslations('showcase.breadcrumbs')
  return (
    <div className="flex items-center flex-wrap gap-2">
      <Link className="text-primary" href="/showcase">
        {t('home')}
      </Link>
      <ChevronRight className="text-[#ccc]" />
      <p className="text-secondary-foreground">{t(`options.${currentPage}`)}</p>
    </div>
  )
}
