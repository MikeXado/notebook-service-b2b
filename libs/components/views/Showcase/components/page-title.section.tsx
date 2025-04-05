'use client'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from '../../../shared/ui/input'
import { cn } from '../../../../utils/cn'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../../shared/ui/select'
import { SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterDto } from '../../../../utils-schema/filter.schema'
import Filters from './filters'
import { debounce } from 'radash'
import { useTranslations } from 'next-intl'

const SORT_OPTIONS = [
  'default',
  'price_asc',
  'price_desc',
  'store_time_desc',
  'store_time_asc'
]

export default function PageTitleSection({
  category,
  filters
}: {
  category: string
  filters?: FilterDto
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchedSerialNumber = searchParams.get('serialNumber')
  const searchedNotebookName = searchParams.get('notebookName')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [serialNumber, setSerialNumber] = useState(searchedSerialNumber || '')
  const [name, setName] = useState(searchedNotebookName || '')
  const t = useTranslations('showcase.header')

  const debouncedSerialNumberChange = debounce(
    { delay: 300 },
    (value: string, searchParams, router, pathname) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (value) {
        newSearchParams.set('serialNumber', value)
      } else {
        newSearchParams.delete('serialNumber')
      }
      router.push(pathname + '?' + newSearchParams.toString())
    }
  )

  const debouncedNameChange = debounce(
    { delay: 300 },
    (value: string, searchParams, router, pathname) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (value) {
        newSearchParams.set('notebookName', value)
      } else {
        newSearchParams.delete('notebookName')
      }
      router.push(pathname + '?' + newSearchParams.toString())
    }
  )

  const handleDebouncedSerialNumberChange = useCallback(
    (value: string) =>
      debouncedSerialNumberChange(value, searchParams, router, pathname),
    [searchParams, router, pathname, debouncedSerialNumberChange]
  )

  const handleDebouncedNameChange = useCallback(
    (value: string) =>
      debouncedNameChange(value, searchParams, router, pathname),
    [searchParams, router, pathname, debouncedNameChange]
  )

  function handleSerialNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSerialNumber(value)
    handleDebouncedSerialNumberChange(value)
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setName(value)
    handleDebouncedNameChange(value)
  }

  return (
    <>
      <div className="flex items-center flex-col gap-5 justify-start lg:justify-between lg:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-medium">{t(`${category}.title`)}</h1>
          <p className="text-secondary-foreground text-sm">
            {t(`${category}.description`)}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-5 w-full flex-col sm:flex-row">
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder={t('form.title_search')}
            className={cn(
              'h-12 border-[#EAEEF1] bg-white focus-visible:outline-none focus-visible:ring-0 focus:border-primary hover:border-primary transition-all duration-300'
            )}
          />
          <Input
            value={serialNumber}
            onChange={handleSerialNumberChange}
            placeholder={t('form.serial_search')}
            className={cn(
              'h-12 border-[#EAEEF1] bg-white focus-visible:outline-none focus-visible:ring-0 focus:border-primary hover:border-primary transition-all duration-300'
            )}
          />

          <SortSelect />

          {filters && (
            <button
              id="show-filters"
              aria-label="show filters"
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              className="bg-white border border-transparent text-sm gap-2 w-full sm:w-auto h-12 px-2 rounded-lg hover:border-primary text-primary transition-all duration-300"
            >
              <div className="flex item-center justify-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
            </button>
          )}
        </div>
      </div>
      {filters && isFiltersOpen && <Filters filters={filters} />}
    </>
  )
}

function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchedSortOption = searchParams.get('sort')
  const t = useTranslations('showcase.header.form.sort')

  function handleSortPriceChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('sort', value)
    router.push(pathname + '?' + newSearchParams.toString())
  }

  return (
    <Select
      defaultValue={searchedSortOption || 'default'}
      onValueChange={handleSortPriceChange}
    >
      <SelectTrigger
        id="show-sort-trigger"
        aria-label="show sort options"
        className="bg-white h-12 text-primary hover:border-primary transition-all duration-300 [&>span]:line-clamp-none [&>span]:truncate"
      >
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('title')}</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {t(`options.${option}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
