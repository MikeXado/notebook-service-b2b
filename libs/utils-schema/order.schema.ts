import { z } from 'zod'

export const OrderItem = z.object({
  invoice_note: z.string(),
  serial_num: z.string(),
  item_name: z.string(),
  num: z.number(),
  item_price: z.number(),
  item_sum: z.number()
})
export const OrderSchema = z.object({
  order_id: z.number(),
  order_date: z.string(),
  status: z.number(),
  order_sum: z.number(),
  items: z.array(OrderItem)
})

export const GetOrderSchema = z.object({
  orders: z.array(OrderSchema),
  error: z.number(),
  err_msg: z.string()
})

export const DoOrderResponseSchema = z.object({
  error: z.number(),
  err_msg: z.string(),
  worder_id: z.number(),
  invoices: z.array(
    z.object({
      invoice_id: z.number()
    })
  )
})

export type Order = z.infer<typeof OrderSchema>
export type OrderItem = z.infer<typeof OrderItem>
export type OrderDto = z.infer<typeof GetOrderSchema>
export type DoOrderResponse = z.infer<typeof DoOrderResponseSchema>
