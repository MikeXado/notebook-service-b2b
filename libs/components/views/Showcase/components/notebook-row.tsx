'use client'
import React from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import { Minus } from 'lucide-react'
import { ifAble, USER_ACTION } from '../../../../permissions/permissions'
import { cn } from '../../../../utils/cn'
import AddToCartSection from './add-to-cart-section'
import { getDiscount } from '../utils/get-discount'
import DisplayCondition from './dispaly-condition'
import NotebookSlider from './slider/notebook-slider'
import { NotebookPowerOn } from './notebook-poweron'
import NotebookLookout from './notebook-lookout'
import { useTranslations } from 'next-intl'

export function NotebookRow({
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
    <div
      className={cn(
        'w-full relative p-2 shadow-lg rounded-lg bg-white h-fit gap-1',
        isUserHasPermission
          ? 'notebook-row-grid'
          : 'notebook-row-grid-not-active'
      )}
    >
      {notebook.is_new === 1 && (
        <div className="text-white text-xs bg-[#ffac30] absolute left-3 z-20 top-3 px-1">
          {t('new')}
        </div>
      )}

      <NotebookSlider
        mark_name={notebook.mark_name}
        serial_num={notebook.serial_num}
        item_name={notebook.item_name}
        has_icon={notebook.has_icon === 1 ? true : false}
      />

      <RowItem title={notebook.mark_name}>
        <p>{notebook.item_name}</p>
        <p className="text-primary text-sm">{notebook.serial_num}</p>
        <p className="text-sm text-muted-foreground bg-gray-200 px-2 rounded-sm">
          {t('store', {
            store_code: notebook.store_code
          })}
        </p>
      </RowItem>

      <RowItem
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
        title={
          notebook.display_cond ? (
            <DisplayCondition condition={notebook.display_cond} />
          ) : (
            t('screen.title')
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

      <RowItem title={t('battery')}>
        <p>{notebook.battery}</p>
      </RowItem>

      <RowItem title={t('price')}>
        {isUserHasPermission ? (
          <div className="flex items-center gap-1">
            <p className="text-[#ce4035] font-medium text-lg shrink-0">
              {getDiscount(notebook.item_price, userDiscount)} USD
            </p>
            <del className="text-secondary-foreground font-medium">
              {notebook.item_price}
            </del>
          </div>
        ) : (
          <p className="blur-sm" title={t('not_active')}>
            Not active
          </p>
        )}
      </RowItem>

      {isUserHasPermission && <AddToCartSection data={notebook} />}
      {notebook.note && (
        <>
          <div />
          <div />
          <div />
          <div />
          <div />
          <RowItem className="col-span-5 -mt-5">
            <p>{notebook.note}</p>
          </RowItem>
        </>
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
    <div className={cn('h-full w-full flex flex-col gap-2', className || '')}>
      {typeof title === 'string' ? ( // render styled paragraph if string provided
        <p className="text-secondary-foreground text-xs">{title}</p>
      ) : (
        title
      )}

      {children}
    </div>
  )
}
