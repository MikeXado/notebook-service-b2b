import { Trash2 } from 'lucide-react'
import React from 'react'
import { cn } from '../../../../utils/cn'

export default function RemoveFromCartSections({
  onClick,
  className
}: {
  onClick: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg bg-white justify-self-end transition-colors duration-300 p-3 border hover:bg-gray-200',
        className
      )}
    >
      <Trash2 className="text-primary w-5 h-5" />
    </button>
  )
}
