import React from 'react'

export default function EmptyResult() {
  return (
    <div className="bg-white py-5 rounded-lg px-2">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> Ничего не найдено{' '}
      </p>
    </div>
  )
}
