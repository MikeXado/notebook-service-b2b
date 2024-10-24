'use server'
import { API_DO_ORDER, API_DO_ORDER_LOTS } from '../../../constants/constants'
import {
  fetchWrapper,
  getAuthSessionOrThrow
} from '../../../service/fetch-wrapper'
import { LotCart } from '../../../utils-schema/lots.schema'
import { CartNotebook } from '../../../utils-schema/notebook.schema'
import { DoOrderResponse } from '../../../utils-schema/order.schema'
import { getLotsQuery, getQuery } from './service'
import { ifAble, USER_ACTION } from '../../../permissions/permissions'

export async function placeOrder(
  lotsCart: LotCart[],
  notebooksCart: CartNotebook[]
) {
  try {
    const session = await getAuthSessionOrThrow()

    const isUserHavePermission = ifAble({
      toDo: [USER_ACTION.DO_ORDER],
      isUserActive: !!session.user.active
    })

    if (!isUserHavePermission) {
      return {
        success: false,
        message: 'У вас нет прав для совершения заказа.'
      }
    }

    if (lotsCart.length === 0 && notebooksCart.length === 0) {
      return {
        success: false,
        message: 'Вы еще ничего не выбрали.'
      }
    }

    if (notebooksCart.length > 0) {
      const response = await fetchWrapper<unknown, DoOrderResponse>({
        url: API_DO_ORDER + getQuery(notebooksCart)
      })

      if (!response.success && !response.result) {
        throw new Error(response.message)
      }
    }

    if (lotsCart.length > 0) {
      const response = await fetchWrapper<unknown, DoOrderResponse>({
        url: API_DO_ORDER_LOTS + getLotsQuery(lotsCart)
      })

      if (!response.success && !response.result) {
        throw new Error(response.message)
      }
    }

    return {
      success: true,
      message: 'Заказ отправлен менеджеру. Спасибо!'
    }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
