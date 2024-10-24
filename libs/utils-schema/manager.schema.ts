import { z } from 'zod'

export const ManagerSchema = z.object({
  error: z.number(),
  err_msg: z.string(),
  mngr_name: z.string(),
  mngr_phone: z.string(),
  mngr_viber: z.string(),
  mngr_telegram: z.string(),
  mngr_photo: z.string()
})

export type ManagerDto = z.infer<typeof ManagerSchema>
