import * as React from 'react'
import { X } from 'lucide-react'
import { Badge } from '../../shared/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '../../shared/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { Filter } from '../../../utils-schema/filter.schema'

type OptionType = {
  label: string
  value: string
}

type MultiSelectProps<T> = {
  values: T
  options: OptionType[]
  selectedKey: string
  setValues: React.Dispatch<React.SetStateAction<T>>
}

export function MultiSelect<T>({
  values,
  options,
  selectedKey,
  setValues
}: MultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback(
    (data: string) => {
      setValues((prevFilters) => ({
        ...prevFilters,
        [selectedKey]: (prevFilters[selectedKey] || []).filter(
          (item: string) => item !== data
        )
      }))
    },
    [selectedKey, setValues]
  )

  const handleSelect = React.useCallback(
    (data: string) => {
      setValues((prevFilters) => ({
        ...prevFilters,
        [selectedKey]: [...(prevFilters[selectedKey] || []), data] // Add the new item
      }))
    },
    [selectedKey, setValues]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setValues((prevFilters) => {
              const currentFilters = prevFilters[selectedKey] || []
              return {
                ...prevFilters,
                [selectedKey]: currentFilters.slice(0, -1) // Remove the last item
              }
            })
          }
        }
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [selectedKey, setValues]
  )

  const selectables = options.filter(
    (option) => !(values[selectedKey] || []).includes(option.value)
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-primary focus-within:ring-0 focus-within:ring-primary focus-within:ring-offset-1 hover:border-primary transition-all duration-300">
        <div className="flex flex-wrap gap-1">
          {(values[selectedKey] || []).map((value: string, index: number) => (
            <Badge
              key={value + index}
              className="bg-white border-input rounded-sm text-primary py-1 px-3 hover:bg-primary hover:text-white flex items-center gap-1"
            >
              <button
                className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(value)}
              >
                <X className="h-3 w-3" />
              </button>
              {value}
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Выберите фильтр"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {selectables.map((option, index) => (
                  <CommandItem
                    key={option.value + index}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      setInputValue('')
                      handleSelect(option.value)
                    }}
                    className={'cursor-pointer'}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
