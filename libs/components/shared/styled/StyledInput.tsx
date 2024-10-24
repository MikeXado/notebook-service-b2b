import React from 'react'
import { StyledSelect } from './StyledSelect'
import { cn } from '../../../utils/cn'
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'

export const StyledInput = ({
  error = false,
  width,
  type,
  placeholder,
  register
}: {
  error?: boolean
  width?: string
  type?: string
  placeholder?: string
  register: UseFormRegisterReturn
}) => {
  return (
    <input
      type={type ? type : 'text'}
      className={cn(
        'h-9 border px-3 border-[#EAEEF1] w-full focus:outline-none focus-visible:outline-none focus:border-[#112878] hover:border-[#112878]',
        error && error === true && 'border-red-500',
        width && `w-[${width}]`
      )}
      {...register}
      placeholder={placeholder}
    />
  )
}

export const StyledLabeledInput = ({
  label,
  placeholder,
  width = '100%',
  onChange,
  type = 'text',
  error
}: {
  label: string
  placeholder: string
  width?: string
  onChange: (value: string) => void
  type?: string
  error?: boolean
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-[#818895] text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        className={cn(
          'border px-3',
          width && `w-[${width}]`,
          error && 'border-red-500'
        )}
        name={label}
        placeholder={placeholder}
        type={type}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  )
}

export const StyledLabeledSelect = ({
  label,
  options,
  width = '100%',
  onChange,
  multi
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-[#818895] text-sm" htmlFor={label}>
        {label}
      </label>
      <StyledSelect
        options={options}
        onChange={onChange}
        width={width}
        multi={multi}
      />
    </div>
  )
}
