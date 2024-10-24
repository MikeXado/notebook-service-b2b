import { z } from 'zod'

export const FilterSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const FiltersSchema = z.object({
  mark: z.array(FilterSchema),
  proc: z.array(FilterSchema),
  ram: z.array(FilterSchema),
  hdd: z.array(FilterSchema),
  display: z.array(FilterSchema),
  lookout: z.array(FilterSchema),
  poweron: z.array(FilterSchema).optional()
})

export const GetFiltersSchema = z.object({
  error: z.number(),
  err_msg: z.string(),
  filters: FiltersSchema
})

export type FilterDto = z.infer<typeof GetFiltersSchema>

export type Filter = z.infer<typeof FilterSchema>
