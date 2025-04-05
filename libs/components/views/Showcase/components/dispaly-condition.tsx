import React from 'react'
import { DisplayConditions } from '../../../../constants/constants'
import { CheckIcon, CircleHelpIcon, XIcon } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'
import { useTranslations } from 'next-intl'

export default function DisplayCondition({
  condition = DisplayConditions.no
}: {
  condition: string
}) {
  const { icon: Icon, key, style } = iconConditionMap[condition]
  const t = useTranslations('showcase.items.screen')
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 text-xs">
          <span>
            <Icon className={cn('w-4 h-4', style)} />
          </span>
          <p className="text-secondary-foreground">{t('title')}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className={style}>
        <p>{t(`options.${key}`)}</p>
      </PopoverContent>
    </Popover>
  )
}

const iconConditionMap = {
  [DisplayConditions.Good]: {
    icon: CheckIcon,
    key: 'Good',
    style: 'text-green-500'
  },
  [DisplayConditions.Defective]: {
    icon: CheckIcon,
    key: 'Defective',
    style: 'text-primary'
  },
  [DisplayConditions.Questionable]: {
    icon: CircleHelpIcon,
    key: 'Questionable',
    style: 'text-orange-500'
  },
  [DisplayConditions.Minimal]: {
    icon: CheckIcon,
    style: 'text-yellow-500',
    key: 'Minimal'
  },
  [DisplayConditions.Bad]: {
    icon: XIcon,
    key: 'Bad',
    style: 'text-red-500'
  },
  [DisplayConditions.no]: {
    icon: XIcon,
    key: 'no',
    style: 'text-gray-400'
  }
}
