import React, { useState } from 'react'
import { NotebookImage } from '../notebook-image'
import { Dialog, DialogTrigger } from '../../../../shared/ui/dialog'
import SliderContent from './slider-content'
import { cn } from '../../../../../utils/cn'

export default function NotebookSlider({
  mark_name,
  serial_num,
  item_name,
  imageClassName,
  has_icon,
  sliderTriggerClassName
}: {
  mark_name: string
  serial_num: string
  item_name: string
  has_icon: boolean
  imageClassName?: string
  sliderTriggerClassName?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const onShowSlider = () => {
    if (!has_icon) return null

    setIsOpen((prev) => !prev)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onShowSlider}>
      <DialogTrigger asChild>
        <button
          disabled={!has_icon}
          className={cn(
            'w-full h-full border rounded-lg',
            sliderTriggerClassName
          )}
        >
          <NotebookImage
            isSlider={true}
            className={imageClassName}
            mark_name={mark_name}
            serial_num={serial_num}
            has_icon={has_icon}
            lazy={false}
          />
        </button>
      </DialogTrigger>
      <SliderContent
        item_name={item_name}
        serial_num={serial_num}
        has_icon={has_icon}
      />
    </Dialog>
  )
}
