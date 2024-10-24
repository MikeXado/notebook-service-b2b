'use client'
import React, { useState } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import { useSession } from 'next-auth/react'
import { classColorMap, NotebookPowerOn, RowItem } from './notebook-row'
import { ifAble, USER_ACTION } from '../../../../permissions/permissions'
import { Check, ChevronDown, Minus } from 'lucide-react'
import AddToCartSection from './add-to-cart-section'
import { getDiscount } from '../utils/get-discount'
import DisplayCondition from './dispaly-condition'
import NotebookRowDetails from './notebook-row-details'
import { cn } from '../../../../utils/cn'
import dynamic from 'next/dynamic'

const NotebookSlider = dynamic(() => import('./notebook-slider'))

export default function NotebookCard({
  notebook,
  rate,
  userActive
}: {
  notebook: Notebook
  rate: number
  userActive?: number
}) {
  const [isExpand, setIsExpand] = useState(false)
  const session = useSession()
  const user = session.data?.user

  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!userActive
  })

  const priceInUAH = Math.floor(notebook.item_price * rate)

  return (
    <div className="bg-white rounded-lg shadow w-full relative flex flex-col justify-between">
      {notebook.is_new === 1 && (
        <div className="absolute top-0 z-20 w-full left-1/2 -translate-x-1/2 text-white bg-[#ffac30] text-center px-1 py-2">
          Новинка
        </div>
      )}
      <NotebookSlider
        imageClassName="w-full h-full aspect-square border-none "
        serial_num={notebook.serial_num}
        mark_name={notebook.mark_name}
        item_name={notebook.item_name}
      />
      <div>
        <p className="text-secondary-foreground text-sm px-3">
          {notebook.serial_num}
        </p>
        <div className="px-3 flex flex-col gap-2 ">
          <h2 className="text-lg font-bold">{notebook.item_name}</h2>
          <p className="text-secondary-foreground">
            {renderSpecs(notebook.proc)} {renderSpecs(notebook.ram)}{' '}
            {renderSpecs(notebook.hdd)}{' '}
            {renderSpecs(notebook.video || notebook.integ_video)}
          </p>

          <div className="flex items-center gap-2">
            <RowItem
              className="flex-grow"
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
                className={
                  'text-white text-sm text-center rounded-sm px-1 py-2'
                }
              >
                {notebook.lookout || <Minus />}
              </div>
            </RowItem>

            <RowItem
              className="w-full flex-grow"
              title={
                notebook.display_cond ? (
                  <DisplayCondition condition={notebook.display_cond} />
                ) : (
                  'Экран'
                )
              }
            >
              <p className="w-full border rounded-sm text-sm px-1 py-2 text-center">
                {notebook.display || <Minus />}
              </p>
            </RowItem>
          </div>
          {isExpand && (
            <NotebookRowDetails
              battery={notebook.battery}
              note={notebook.note}
            />
          )}
          <button
            title="Показать подробности"
            onClick={() => setIsExpand((prev) => !prev)}
            className="w-full text-center flex items-center justify-center border rounded-lg hover:bg-gray-200"
          >
            <ChevronDown
              className={cn(
                'text-primary w-8 h-8 transition-all duration-300',
                isExpand && 'rotate-180'
              )}
            />
          </button>

          <div className="flex items-center justify-between pb-2 gap-2">
            {isUserHasPermission ? (
              <div>
                <del className=" text-secondary-foreground text-sm">
                  {notebook.item_price} USD
                </del>
                <p className="text-lg text-primary">
                  {getDiscount(notebook.item_price, user?.ppg_perc)} USD
                  <span>({priceInUAH}UAH)</span>
                </p>
              </div>
            ) : (
              <p className="blur-sm">Not active</p>
            )}

            {isUserHasPermission && (
              <AddToCartSection className="p-2" data={notebook} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderSpecs(value: string) {
  if (!value || value === 'Нет') {
    return ''
  } else {
    return value + '/'
  }
}
