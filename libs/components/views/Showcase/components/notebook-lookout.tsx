import React from 'react'
import { LookoutConditions } from '../../../../constants/constants'
import { Minus } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'
import { useTranslations } from 'next-intl'

export default function NotebookLookout({ lookout }: { lookout: string }) {
  const { key, style } =
    iconConditionMap[lookout] || iconConditionMap[LookoutConditions.unknown]
  const t = useTranslations('showcase.items.lookout')
  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            'text-white text-sm text-center rounded-sm px-1 py-2',
            style
          )}
        >
          {lookout || <Minus />}
        </div>
      </PopoverTrigger>
      <PopoverContent className={style}>
        <p className="text-white">{t(`${key}`)}</p>
      </PopoverContent>
    </Popover>
  )
}

const iconConditionMap = {
  [LookoutConditions.classA]: {
    key: 'classA',
    style: 'bg-[#5FD071]'
  },
  [LookoutConditions.classB]: {
    key: 'classB',
    style: 'bg-[#BCDB57]'
  },
  [LookoutConditions.classC]: {
    key: 'classC',
    style: 'bg-[#AFAE72]'
  },

  [LookoutConditions.unknown]: {
    key: 'unknown',
    style: 'bg-[#D9D9D9]'
  }
}
