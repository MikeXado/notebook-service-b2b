import { z } from 'zod'

export const ExchangeRateSchema = z.object({
  currency_id: z.number(),
  currency_name: z.string(),
  rate: z.number(),
  error: z.number(),
  err_msg: z.string()
})

export type ExchangeRateDto = z.infer<typeof ExchangeRateSchema>
