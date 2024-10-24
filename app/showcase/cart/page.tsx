import { getServerSession } from 'next-auth'
import Cart from '../../../libs/components/views/Cart/cart.page'
import { API_GET_EXRATE } from '../../../libs/constants/constants'
import { fetchWrapper } from '../../../libs/service/fetch-wrapper'
import { ExchangeRateDto } from '../../../libs/utils-schema/exrate.schema'
import { nextAuthOptions } from '../../../libs/service/auth-options'

export default async function Page() {
  const [userSession, exchangeRate] = await Promise.all([
    getServerSession(nextAuthOptions),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    })
  ])

  return (
    <Cart
      rate={exchangeRate.result.rate}
      currencyName={exchangeRate.result.currency_name}
      userActive={userSession.user.active}
      userDiscountPercent={userSession.user.ppg_perc}
    />
  )
}
