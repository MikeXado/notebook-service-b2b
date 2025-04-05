import Cart from '../../../../libs/components/views/Cart/cart.page'
import { API_GET_EXRATE } from '../../../../libs/constants/constants'
import {
  fetchWrapper,
  getUserOrThrow
} from '../../../../libs/service/fetch-wrapper'
import { ExchangeRateDto } from '../../../../libs/utils-schema/exrate.schema'

export default async function Page() {
  const [user, exchangeRate] = await Promise.all([
    getUserOrThrow(),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    })
  ])

  return (
    <Cart
      rate={exchangeRate?.result?.rate || 0}
      currencyName={exchangeRate?.result?.currency_name || 'USD'}
      userActive={user.active}
      userDiscountPercent={user.ppg_perc}
    />
  )
}
