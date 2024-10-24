import React from 'react'
import Link from 'next/link'

export default function EmptyCartPlaceholder() {
  return (
    <div className="bg-white py-5 rounded-lg px-2 flex items-center gap-1">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> Вы еще ничего не выбрали.{' '}
      </p>
      <Link className="text-primary text-sm hover:underline" href="/showcase">
        Вернуться на главную
      </Link>
    </div>
  )
}
