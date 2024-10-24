import { LotCart, LotsCartSchema } from '../utils-schema/lots.schema'
import {
  CartNotebook,
  CartNotebookSchema
} from '../utils-schema/notebook.schema'
import { useLocalStorageSafe } from './useLocalStorageSafe'

export const storageOptions = {
  validateInit: (value: unknown) =>
    CartNotebookSchema.array().safeParse(value).success
}

export const storageLotsOptions = {
  validateInit: (value: unknown) =>
    LotsCartSchema.array().safeParse(value).success
}

export const storageDefaultValue = []
export const storageLotsDefaultValue = []

export const useCart = () => {
  return useLocalStorageSafe<CartNotebook[]>(
    'notebooks-cart',
    storageDefaultValue,
    storageOptions
  )
}

export const useLotsCart = () => {
  return useLocalStorageSafe<LotCart[]>(
    'notebooks-lots-cart',
    storageLotsDefaultValue,
    storageLotsOptions
  )
}
