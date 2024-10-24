'use client'
import React, { useState } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import { Check, ChevronDown, Minus, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ifAble, USER_ACTION } from '../../../../permissions/permissions'
import dynamic from 'next/dynamic'
import NotebookRowDetails from './notebook-row-details'
import { cn } from '../../../../utils/cn'
import AddToCartSection from './add-to-cart-section'
import { getDiscount } from '../utils/get-discount'
import DisplayCondition from './dispaly-condition'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../../shared/ui/tooltip'

const NotebookSlider = dynamic(() => import('./notebook-slider'))

export function NotebookRow({
  notebook,
  rate,
  currencyName,
  userActive
}: {
  notebook: Notebook
  rate: number
  currencyName: string
  userActive?: number
}) {
  const [isExpand, setIsExpand] = useState(false)
  const session = useSession()
  const user = session.data?.user
  const priceInUAH = Math.floor(notebook.item_price * rate)

  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!userActive
  })

  return (
    <div className="w-full relative p-5 shadow-lg rounded-lg bg-white h-fit notebook-row-grid  gap-3">
      {notebook.is_new === 1 && (
        <div className="text-white text-xs bg-[#ffac30] absolute left-3 top-3 px-1">
          Новинка
        </div>
      )}

      {isUserHasPermission && <AddToCartSection data={notebook} />}
      <RowItem title={notebook.mark_name}>
        <p>{notebook.item_name}</p>
        <p className="text-primary text-sm">{notebook.serial_num}</p>
      </RowItem>

      <NotebookSlider
        mark_name={notebook.mark_name}
        serial_num={notebook.serial_num}
        item_name={notebook.item_name}
      />

      <RowItem
        title={
          notebook.poweron ? (
            <NotebookPowerOn powerOn={notebook.poweron} />
          ) : (
            'Вн. вид'
          )
        }
      >
        <div
          style={{ backgroundColor: classColorMap[notebook.lookout] }}
          className={'text-white text-sm text-center rounded-sm px-1 py-2'}
        >
          {notebook.lookout || <Minus />}
        </div>
      </RowItem>

      <RowItem
        title={
          notebook.display_cond ? (
            <DisplayCondition condition={notebook.display_cond} />
          ) : (
            'Экран'
          )
        }
      >
        <p>{notebook.display || <Minus />}</p>
      </RowItem>

      <RowItem title="CPU">
        <p>{notebook.proc || <Minus />}</p>
      </RowItem>

      <RowItem title="GPU">
        <p>{notebook.video || notebook.integ_video || <Minus />}</p>
      </RowItem>

      <RowItem title="RAM">
        <p>{notebook.ram || <Minus />}</p>
      </RowItem>

      <RowItem title="SDD/HDD">
        <p>{notebook.hdd || <Minus />}</p>
      </RowItem>

      <RowItem title="Цена (опт.)">
        {isUserHasPermission ? (
          <p>
            <span>{notebook.item_price}</span> {currencyName}
            {user?.active &&
              `(${getDiscount(notebook.item_price, user.ppg_perc)})`}
          </p>
        ) : (
          <p className="blur-sm">Not active</p>
        )}
      </RowItem>

      <RowItem title="Цена(UAH)">
        {isUserHasPermission ? (
          <p>{priceInUAH}</p>
        ) : (
          <p className="blur-sm">Not active</p>
        )}
      </RowItem>

      <button
        onClick={() => setIsExpand((prev) => !prev)}
        className="absolute bottom-1 right-1 border rounded-lg hover:bg-gray-200"
      >
        <ChevronDown className="text-primary w-5 h-5" />
      </button>
      {isExpand && (
        <NotebookRowDetails battery={notebook.battery} note={notebook.note} />
      )}
    </div>
  )
}

export function RowItem({
  title,
  children,
  className
}: {
  title?: string | React.JSX.Element
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('h-full w-full flex flex-col gap-3', className)}>
      {typeof title === 'string' ? ( // render styled paragraph if string provided
        <p className="text-secondary-foreground text-xs">{title}</p>
      ) : (
        title
      )}

      {children}
    </div>
  )
}

export function NotebookPowerOn({ powerOn }: { powerOn: string }) {
  const isPowerOn = powerOn === 'Да'
  return (
    <TooltipProvider>
      {' '}
      <Tooltip>
        {' '}
        <TooltipTrigger>
          {isPowerOn ? (
            <span className="pointer text-secondary-foreground text-xs flex items-center gap-2">
              <Check className="w-3 h-3 pointer text-green-500" />
              Рабочий
            </span>
          ) : (
            <span className="pointer text-secondary-foreground text-xs flex items-center gap-2">
              <X className="w-3 h-3 text-red-500" />
              Не вкл-ся
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isPowerOn ? (
            <p className="text-xs text-green-500">
              Ноутбук включается, показывает изображение
            </p>
          ) : (
            <p className="text-xs text-red-500">
              Ноутбук не включается или не показывает картинку
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const classColorMap = {
  'Класс A': '#5FD071',
  'Класс B': '#BCDB57',
  'Класс C': '#AFAE72'
}
