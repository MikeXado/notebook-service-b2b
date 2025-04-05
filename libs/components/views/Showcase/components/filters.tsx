'use client'
import React, { useState } from 'react'
import { FilterDto, FiltersEnum } from '../../../../utils-schema/filter.schema'
import { cn } from '../../../../utils/cn'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { displayOptions } from '../../../../constants/constants'
import { MultiSelect } from '../../../shared/ui/multi-select'
import { buttonClass } from '../../../shared/styled/action-button'
import { Checkbox } from '../../../shared/ui/checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

type Checked = DropdownMenuCheckboxItemProps['checked']

export default function Filters({ filters: data }: { filters: FilterDto }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('showcase.header.filters')
  const [values, setValues] = useState<Record<string, string[]>>(() => {
    const initialValues: Record<string, string[]> = {}
    FiltersEnum.options.forEach((key) => {
      initialValues[key] = [...searchParams.getAll(key)]
    })
    return initialValues
  })

  const [showNewItems, setShowNewItems] = useState<Checked>(
    searchParams.get('new') ? true : false
  )

  function applyFilters() {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    for (const [key, selectedValues] of Object.entries(values)) {
      newSearchParams.delete(key)

      selectedValues.forEach((value) => {
        newSearchParams.append(key, value)
      })
    }
    if (showNewItems) {
      newSearchParams.set('new', '1')
    } else {
      newSearchParams.delete('new')
    }

    newSearchParams.set('page', '1')
    router.replace(pathname + '?' + newSearchParams.toString())
  }

  return (
    <div className={cn('relative p-5 shadow-lg rounded-md bg-white h-fit')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {Object.keys(data.filters).map((key) => {
          const filterKey = key as FiltersEnum

          if (filterKey === 'proc') {
            return
          }

          if (filterKey === 'display') {
            return (
              <div key={filterKey}>
                <p className="text-secondary-foreground text-sm">
                  {t(`options.${filterKey}`)}
                </p>
                <MultiSelect<Record<string, string[]>>
                  selectedKey={key}
                  options={displayOptions}
                  setValues={setValues}
                  values={values}
                  placeholder={t('placeholder')}
                />
              </div>
            )
          }

          return (
            <div key={filterKey}>
              <p className="text-secondary-foreground text-sm">
                {t(`options.${filterKey}`)}
              </p>
              <MultiSelect<Record<string, string[]>>
                selectedKey={filterKey}
                options={data.filters[filterKey] || []}
                setValues={setValues}
                values={values}
                placeholder={t('placeholder')}
              />
            </div>
          )
        })}
        <div className="w-full place-self-end flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-center">
            <Checkbox
              id="new"
              checked={showNewItems}
              onCheckedChange={setShowNewItems}
            />
            <label htmlFor="new" className="text-sm text-secondary-foreground">
              {t('show_new')}{' '}
            </label>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              applyFilters()
            }}
            className={cn(buttonClass(false), 'h-10 w-full')}
          >
            {t('submit')}{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
