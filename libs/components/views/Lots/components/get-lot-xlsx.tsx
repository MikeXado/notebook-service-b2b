'use client'
import React, { useTransition } from 'react'
import { getLotExcel } from '../action'
import { toast } from '../../../shared/ui/use-toast'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function GetLotExcel() {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('showcase.export')
  function handleExportExcel() {
    startTransition(async () => {
      try {
        const xlsx = await getLotExcel()
        const link = document.createElement('a')
        link.href = xlsx
        link.download = `lots.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        toast({
          title: t('error'),
          variant: 'destructive'
        })
      }
    })
  }
  return (
    <button
      disabled={isPending}
      className="rounded-lg flex items-center gap-2 p-3 bg-white border text-primary text-sm hover:border-primary transition-colors duration-300"
      onClick={handleExportExcel}
    >
      <Image
        src="/assets/icons/excel.svg"
        className="fill:bg-white"
        width={18}
        height={18}
        alt="excel"
      />
      <span>{t('title')}</span>
    </button>
  )
}
