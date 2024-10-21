import React, { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { cn } from '../../../../utils/cn'

export function NotebookImage({
  serial_num,
  mark_name,
  onError,
  className,
  isSlider
}: {
  serial_num: string
  mark_name: string
  onError?: () => void
  className?: string
  isSlider?: boolean
}) {
  const [isError, setIsError] = useState(false)

  function handleImageError() {
    setIsError(true)
    onError?.()
  }

  return (
    <div
      className={cn(
        'w-20 h-20 p-1 relative flex flex-shrink-0 items-center justify-center rounded-lg border group transition-all duration-300',
        className
      )}
    >
      <Image
        onError={handleImageError}
        fill
        src={
          isError
            ? '/assets/icons/notebook-icon.svg'
            : `/media/img/${serial_num}/icon.jpg`
        }
        alt={`${mark_name} notebook image`}
        className={cn(
          'transition-all duration-300 rounded-lg',
          !isError && isSlider && 'group-hover:bg-white group-hover:opacity-50'
        )}
      />

      {isSlider && (
        <ZoomIn
          className={cn(
            'absolute text-primary top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden transition-all duration-300',
            !isError && 'group-hover:block'
          )}
        />
      )}
    </div>
  )
}