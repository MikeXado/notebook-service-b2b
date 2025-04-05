import { Check, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'
import { cn } from '../../../../utils/cn'
import { useTranslations } from 'next-intl'

export function NotebookPowerOn({
  powerOn,
  className
}: {
  powerOn: string
  className?: string
}) {
  const isPowerOn = powerOn === 'Да'
  const t = useTranslations('showcase.items.poweron')
  return (
    <Popover>
      {' '}
      <PopoverTrigger>
        {isPowerOn ? (
          <span
            className={cn(
              'pointer text-secondary-foreground text-xs flex items-center gap-2',
              className
            )}
          >
            <Check className="w-4 h-4 pointer text-green-500" />
            {t('yes.title')}
          </span>
        ) : (
          <span
            className={cn(
              'pointer text-secondary-foreground text-xs flex items-center gap-2',
              className
            )}
          >
            <X className="w-4 h-4 text-red-500" />
            {t('no.title')}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        {isPowerOn ? (
          <p className=" text-green-500">{t('yes.description')}</p>
        ) : (
          <p className=" text-red-500">{t('no.description')}</p>
        )}
      </PopoverContent>
    </Popover>
  )
}
