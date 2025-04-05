import React from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import { hexToDataUrl } from '../../../../utils/rgb-to-data-url'

export function NotebookImage({
  serial_num,
  mark_name,
  className,
  isSlider,
  has_icon,
  lazy = true
}: {
  serial_num: string
  mark_name: string
  className?: string
  isSlider?: boolean
  has_icon: boolean
  lazy?: boolean
}) {
  return (
    <div
      className={cn(
        'w-24 h-24 p-1 relative flex flex-shrink-0 items-center justify-center rounded-lg  group transition-all duration-300',
        className || ''
      )}
    >
      <div className="relative aspect-square w-full h-full">
        <Image
          fill
          src={
            !has_icon
              ? '/assets/icons/notebook-icon.svg'
              : `${process.env['NEXT_PUBLIC_MEDIA_URL']}/img/${serial_num}/icon.jpg`
          }
          alt={`${mark_name} notebook image`}
          placeholder="blur"
          sizes="1200"
          blurDataURL={hexToDataUrl('#F3F6FB')}
          loading={lazy ? 'lazy' : 'eager'}
          className={cn(
            'w-full transition-all duration-300 rounded-lg',
            has_icon && isSlider
              ? 'group-hover:bg-white group-hover:opacity-50'
              : ''
          )}
        />
      </div>

      {isSlider && (
        <ZoomIn
          className={cn(
            'absolute text-primary top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden transition-all duration-300',
            has_icon ? 'group-hover:block' : ''
          )}
        />
      )}
    </div>
  )
}
