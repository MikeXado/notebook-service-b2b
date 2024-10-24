import { z } from 'zod'

export const NotebookSchema = z.object({
  item_id: z.number(),
  mark_name: z.string(),
  item_name: z.string(),
  serial_num: z.string(),
  lookout: z.string(),
  display: z.string(),
  proc: z.string(),
  video: z.string(),
  integ_video: z.string(),
  hdd: z.string(),
  ram: z.string(),
  battery: z.string(),
  poweron: z.string(),
  display_cond: z.string(),
  note: z.string(),
  item_price: z.number(),
  is_new: z.number(),
  ainvoicedtl_id: z.number(),
  num: z.number()
})

export const GetNotebookSchema = z.object({
  error: z.number(),
  error_msg: z.string(),
  items: z.array(NotebookSchema)
})

export const CartNotebookSchema = z.object({
  item_id: z.number(),
  serial_num: z.string(),
  mark_name: z.string(),
  item_name: z.string(),
  item_price: z.number()
})

export type Notebook = z.infer<typeof NotebookSchema>

export type NotebookDto = z.infer<typeof GetNotebookSchema>
export type CartNotebook = z.infer<typeof CartNotebookSchema>
