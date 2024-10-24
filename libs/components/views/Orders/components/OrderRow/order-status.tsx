import { Check, Loader } from 'lucide-react'
import React from 'react'

export function OrderStatus({ status }: { status: number }) {
  return (
    <>
      {status ? (
        <div className="flex items-center gap-2">
          {' '}
          <Check className="text-green-500" /> Выполнен{' '}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {' '}
          <Loader className="text-orange-500" /> В обработке
        </div>
      )}
    </>
  )
}
