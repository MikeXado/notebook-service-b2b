import { z } from 'zod'

export const LotItemSchema = z.object({
  item_name: z.string(),
  serial_num: z.number(),
  poweron: z.string(),
  display: z.string(),
  display_cond: z.string(),
  proc: z.string(),
  video: z.string(),
  integ_video: z.string(),
  hdd: z.string(),
  ram: z.string(),
  battery: z.string(),
  note: z.string(),
  item_price: z.number()
})

export const LotsSchema = z.object({
  lot_name: z.string(),
  lot_sum: z.number(),
  items: z.array(LotItemSchema)
})

export const GetLotsSchema = z.object({
  lots: z.array(LotsSchema),
  error: z.number(),
  err_msg: z.string()
})

export const LotsCartSchema = z.object({
  lot_name: z.string(),
  lot_sum: z.number()
})

export type LotsDto = z.infer<typeof GetLotsSchema>
export type Lot = z.infer<typeof LotItemSchema>
export type LotCart = z.infer<typeof LotsCartSchema>
