'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'
import { Check, ChevronDown, X } from 'lucide-react'

export const StyledSelect = ({
  options = [],
  onChange,
  multi = false,
  width
}: {
  options: { label: string; value: string }[]
  onChange: (values: string[]) => void
  multi?: boolean
  width?: string
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const selectRef = useRef<HTMLSelectElement>(null)

  const onMultiChange = (value: string) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues((prev) => [...prev, value])
    }
  }

  const removeSelected = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value))
  }

  const getLabel = (selected: string) =>
    options.find((option) => option.value === selected)?.label || ''

  useEffect(() => {
    onChange(selectedValues)
  }, [selectedValues, onChange])

  return (
    <div className={cn('relative multi-select w-full', width && `${width}`)}>
      <div className="flex flex-wrap items-center gap-2 absolute top-0 left-0 h-full z-10 pointer-events-none px-3">
        {multi && selectedValues.length === 0 ? (
          <div className="text-secondary-foreground text-sm font-medium">
            Select option
          </div>
        ) : (
          selectedValues.map((selected) => (
            <div
              className="text-sm z-10 pointer-events-none h-6 py-1 px-3 flex items-center gap-2 text-primary border rounded-sm transition-all"
              key={selected}
            >
              <div
                className="flex items-center pointer-events-auto  text-primary cursor-pointer h-4 w-3"
                onClick={() => removeSelected(selected)}
              >
                <X />
              </div>
              {getLabel(selected)}
            </div>
          ))
        )}
      </div>

      <select
        className={cn(
          'relative p-3 text-sm appearance-none w-full h-full rounded-lg cursor-pointer border border-[#EAEEF1] hover:border-primary focus-visible:border-primary transition-all focus-visible:outline-none'
        )}
        ref={selectRef}
        name="select-component"
        value={multi ? '' : selectedValues[0] || ''}
        onChange={({ target }) =>
          multi
            ? onMultiChange(target.value)
            : setSelectedValues([target.value])
        }
      >
        {multi && <option hidden value="" />}{' '}
        {options.map((option) => (
          <option
            className="text-primary disabled:text-[#EAEEF1]"
            key={option.value}
            value={option.value}
            disabled={selectedValues.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
