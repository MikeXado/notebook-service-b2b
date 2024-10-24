import { LotCart } from '../../../utils-schema/lots.schema'
import { CartNotebook } from '../../../utils-schema/notebook.schema'
import { getDiscount } from '../Showcase/utils/get-discount'

export const getNotebooksPriceSum = (notebooks: CartNotebook[]) => {
  return notebooks?.reduce((acc, notebook) => acc + notebook.item_price, 0) || 0
}
export const getLotsPriceSum = (lots: LotCart[]) => {
  return lots?.reduce((acc, lot) => acc + lot.lot_sum, 0) || 0
}

export const getQuery = (notebooks: CartNotebook[]) => {
  const searchParams = new URLSearchParams()
  for (let notebook of notebooks) {
    searchParams.append('serial_num', notebook.serial_num)
  }
  return '?' + searchParams.toString()
}

export const getLotsQuery = (lots: LotCart[]) => {
  const searchParams = new URLSearchParams()
  for (let lot of lots) {
    searchParams.append('lot_name', lot.lot_name)
  }

  return '?' + searchParams.toString()
}

export const getSumCounts = (
  notebooksCart: CartNotebook[],
  lotsCart: LotCart[],
  discountPrecent: number
) => {
  if (!notebooksCart?.length && !lotsCart?.length) return {}

  const nSum = getNotebooksPriceSum(notebooksCart)
  const lSum = getLotsPriceSum(lotsCart)
  const nDiscountSum = getDiscount(nSum, discountPrecent)

  const currentSum = lSum + nSum
  const discountTotal = nSum - nDiscountSum
  const sumDiff = currentSum - discountTotal

  return {
    currentSum,
    discountTotal,
    sumDiff
  }
}
