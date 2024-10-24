import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeftCircle, ChevronRightCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { cn } from '../../../../utils/cn'
import { NotebookImage } from './notebook-image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../shared/ui/dialog'

const IMG_IDS = [1, 2, 3, 4]
const LAST_IMG_INDEX = IMG_IDS.length - 1

export default function NotebookSlider({
  mark_name,
  serial_num,
  item_name,
  imageClassName
}: {
  mark_name: string
  serial_num: string
  item_name: string
  imageClassName?: string
}) {
  const image = useRef<HTMLImageElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const activeItem = IMG_IDS[activeItemIndex]
  const src = `/media/img/${serial_num}/${activeItem}.jpg`

  const onShowSlider = () => {
    if (isError) return null

    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!image.current?.complete) setLoading(true)
  }, [activeItemIndex])

  const decrease = () => {
    const nextIndex = activeItemIndex - 1
    setActiveItemIndex(nextIndex < 0 ? LAST_IMG_INDEX : nextIndex)
  }

  const increase = () => {
    const nextIndex = activeItemIndex + 1
    setActiveItemIndex(nextIndex > LAST_IMG_INDEX ? 0 : nextIndex)
  }

  const handleImageError = () => {
    setIsError(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onShowSlider}>
      <DialogTrigger asChild>
        <button disabled={isError}>
          <NotebookImage
            isSlider={true}
            className={imageClassName}
            mark_name={mark_name}
            serial_num={serial_num}
            onError={() => setIsError(true)}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 items-center max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{item_name}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-5 w-full h-full relative ">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}

          <button onClick={decrease}>
            <ChevronLeftCircle className="w-7 h-7" />
          </button>

          <div className="relative w-full h-full aspect-square">
            <Image
              className={cn(
                'transition-opacity duration-300',
                loading && 'opacity-70'
              )}
              ref={image}
              src={isError ? '/assets/icons/notebook-icon.svg' : src}
              fill
              sizes="800"
              alt="notebook full size img"
              onLoadingComplete={() => {
                console.log('loading complete')
                setLoading(false)
              }}
              onError={handleImageError}
            />
          </div>
          <button onClick={increase}>
            <ChevronRightCircle className="w-7 h-7" />
          </button>

          {/* <SliderDots
        items={IMG_IDS}
        activeItem={activeItem}
        setActiveItemIndex={setActiveItemIndex}
      /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
