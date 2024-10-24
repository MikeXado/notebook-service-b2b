'use client'

import React from 'react'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()
  const currentPage = pathname.split('/showcase/').pop()

  return (
    <div className="flex items-center flex-wrap gap-2">
      <Link className="text-primary" href="/showcase">
        Главная
      </Link>
      <ChevronRight className="text-[#ccc]" />
      <p className="text-secondary-foreground">
        {renderTextByCurrentPage[currentPage]}
      </p>
    </div>
  )
}

const renderTextByCurrentPage: Record<string, string> = {
  unfinished: 'Не готовые ноутбуки',
  finished: 'Готовые',
  lots: 'Лоты',
  cart: 'Корзина',
  orders: 'Мои заказы'
}
