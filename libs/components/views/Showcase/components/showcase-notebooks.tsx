'use client'
import React, { useState, useTransition } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import NotebookCard from './notebook-card'
import { NotebookRow } from './notebook-row'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getExcelByCategory } from '../action'
import { toast } from '../../../shared/ui/use-toast'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../../shared/ui/select'
import { useTranslations } from 'next-intl'

export default function ShowcaseNotebooks({
  notebooks,
  userActive,
  category,
  userDiscount
}: {
  notebooks: Notebook[]
  userActive?: number
  category: string
  userDiscount: number
}) {
  const [showCards, setShowCards] = useState(false)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('showcase')

  function handleExportExcel() {
    startTransition(async () => {
      try {
        const xlsx = await getExcelByCategory(category)
        const link = document.createElement('a')
        link.href = xlsx
        link.download = `notebooks.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        toast({
          title: t('export.error'),
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <>
      <div className="items-center justify-end gap-2 flex">
        <button
          disabled={isPending}
          className="rounded-lg flex items-center gap-2 p-2 bg-white border border-transparent text-primary text-sm hover:border-primary transition-colors duration-300"
          onClick={handleExportExcel}
        >
          <Image
            src="/assets/icons/excel.svg"
            className="fill:bg-white"
            width={18}
            height={18}
            alt="excel"
          />
          <span>{t('export.title')}</span>
        </button>
        <div className="items-center gap-2 hidden lg:flex">
          <SelectItemsSize />
          <button
            onClick={() => setShowCards(true)}
            className={cn(
              'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
              showCards ? 'bg-primary text-white' : 'bg-white text-primary'
            )}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowCards(false)}
            className={cn(
              'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
              showCards ? 'bg-white text-primary' : 'bg-primary text-white'
            )}
          >
            <LayoutList className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        {showCards ? (
          <div className="notebook-card-grid">
            {notebooks.map((notebook, index) => (
              <NotebookCard
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                userActive={userActive}
                userDiscount={userDiscount}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notebooks.map((notebook, index) => (
              <NotebookRow
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                userActive={userActive}
                userDiscount={userDiscount}
              />
            ))}
          </div>
        )}
      </div>

      <div className="notebook-card-grid grid lg:hidden">
        {notebooks.map((notebook, index) => (
          <NotebookCard
            key={`${notebook.item_id}_${index}`}
            notebook={notebook}
            userActive={userActive}
            userDiscount={userDiscount}
          />
        ))}
      </div>
    </>
  )
}

function SelectItemsSize() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const itemsPerPage = searchParams.get('itemsPerPage') || '20'
  const t = useTranslations('showcase.pagination')

  function handleSelectItemsChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('itemsPerPage', value)
    newSearchParams.delete('page')
    router.push(pathname + '?' + newSearchParams.toString())
  }

  return (
    <Select defaultValue={itemsPerPage} onValueChange={handleSelectItemsChange}>
      <SelectTrigger className="bg-white hover:border-primary transition-colors duration-300">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('title')}</SelectLabel>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="40">40</SelectItem>
          <SelectItem value="60">60</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
