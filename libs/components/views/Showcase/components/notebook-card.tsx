'use client'
import React from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import { RowItem } from './notebook-row'
import { ifAble, USER_ACTION } from '../../../../permissions/permissions'
import { CircleHelp, Minus } from 'lucide-react'
import AddToCartSection from './add-to-cart-section'
import { getDiscount } from '../utils/get-discount'
import DisplayCondition from './dispaly-condition'
import NotebookSlider from './slider/notebook-slider'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'
import NotebookLookout from './notebook-lookout'
import { NotebookPowerOn } from './notebook-poweron'
import { renderSpecs } from '../../../shared/render-specs'
import { useTranslations } from 'next-intl'

export default function NotebookCard({
  notebook,
  userActive,
  userDiscount
}: {
  notebook: Notebook
  userActive?: number
  userDiscount: number
}) {
  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!userActive
  })

  const t = useTranslations('showcase.items')

  return (
    <div className="bg-white rounded-lg shadow w-full h-full relative flex flex-col justify-between">
      {notebook.is_new === 1 && (
        <div className="absolute rounded-t-lg top-0 z-20 w-full left-1/2 -translate-x-1/2 text-white bg-[#ffac30] text-center px-1 py-2">
          {t('new')}
        </div>
      )}
      <NotebookSlider
        sliderTriggerClassName="border-none"
        imageClassName="w-full h-full aspect-square p-0"
        serial_num={notebook.serial_num}
        mark_name={notebook.mark_name}
        item_name={notebook.item_name}
        has_icon={notebook.has_icon === 1 ? true : false}
      />
      <div>
        <div className="flex items-center gap-2 justify-between px-3">
          <p className="text-secondary-foreground text-sm flex items-center gap-2">
            <span>{notebook.serial_num}</span>
            <span className="bg-gray-200 px-2 rounded-sm ">
              {t('store', {
                store_code: notebook.store_code
              })}{' '}
            </span>
          </p>

          {notebook.note && <NotebookNote note={notebook.note} />}
        </div>
        <div className="px-3 flex flex-col gap-2 ">
          <h2 className="text-lg font-bold">{notebook.item_name}</h2>
          <p className="text-secondary-foreground">
            {renderSpecs(notebook.proc)} {renderSpecs(notebook.ram)}{' '}
            {renderSpecs(notebook.hdd)}{' '}
            {renderSpecs(notebook.video || notebook.integ_video)}
            {notebook.battery && renderSpecs(notebook.battery)}
          </p>

          <div className="flex items-center gap-2">
            <RowItem
              className="flex-grow"
              title={
                notebook.poweron ? (
                  <NotebookPowerOn powerOn={notebook.poweron} />
                ) : (
                  t('poweron.title')
                )
              }
            >
              <NotebookLookout lookout={notebook.lookout} />
            </RowItem>

            <RowItem
              className="w-full flex-grow"
              title={
                notebook.display_cond ? (
                  <DisplayCondition condition={notebook.display_cond} />
                ) : (
                  t('screen.title')
                )
              }
            >
              <p className="w-full border rounded-sm text-sm px-1 py-2 text-center">
                {notebook.display || <Minus />}
              </p>
            </RowItem>
          </div>

          <div className="flex items-center justify-between pb-2 gap-2">
            {isUserHasPermission ? (
              <div className="flex items-center gap-2">
                <p className="text-xl text-[#ce4035] font-medium">
                  {getDiscount(notebook.item_price, userDiscount)} USD
                </p>
                <del className=" text-secondary-foreground text-lg">
                  {notebook.item_price} USD
                </del>
              </div>
            ) : (
              <p className="blur-sm" title={t('not_active')}>
                Not active
              </p>
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

export function NotebookNote({ note }: { note: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleHelp className="w-5 h-5 text-orange-500" />
      </PopoverTrigger>
      <PopoverContent>
        <p>{note}</p>
      </PopoverContent>
    </Popover>
  )
}
