import React from 'react'
import { DisplayConditions } from '../../../../constants/constants'
import { CheckIcon, CircleHelpIcon, XIcon } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../../shared/ui/tooltip'

export default function DisplayCondition({ condition }: { condition: string }) {
  const { icon: Icon, title, style } = iconConditionMap[condition]
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2 text-xs">
            <span>
              <Icon className={cn('w-3 h-3', style)} />
            </span>
            <p className="text-secondary-foreground">Экран</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className={style}>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const iconConditionMap = {
  [DisplayConditions.Good]: {
    icon: CheckIcon,
    title: 'Рабочее состояние',
    style: 'text-green-500'
  },
  [DisplayConditions.Defective]: {
    icon: CheckIcon,
    title: 'Показывает но есть дефекты в виде полос или засветов',
    style: 'text-orange-500'
  },
  [DisplayConditions.Questionable]: {
    icon: CircleHelpIcon,
    title: 'Нет возможности проверить, без видимых дефектов',
    style: 'text-[#7547D1]'
  },
  [DisplayConditions.Bad]: {
    icon: XIcon,
    title: 'Разбит или отсутствует',
    style: 'text-red-500'
  }
}
