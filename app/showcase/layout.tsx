import React from 'react'
import PrivateLayout from '../../libs/components/shared/layouts/PrivateLayout/PrivateLayout'
import { API_GET_EXRATE, API_ORDERS } from '../../libs/constants/constants'
import { ExchangeRateDto } from '../../libs/utils-schema/exrate.schema'
import { OrderDto } from '../../libs/utils-schema/order.schema'
import { fetchWrapper } from '../../libs/service/fetch-wrapper'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../../libs/service/auth-options'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const [userSession, exchangeRate, orders] = await Promise.all([
    getServerSession(nextAuthOptions),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    }),
    fetchWrapper<unknown, OrderDto>({
      url: API_ORDERS
    })
  ])

  return (
    <PrivateLayout
      numberOrders={orders.result.orders.length || 0}
      currencyName={exchangeRate.result.currency_name}
      rate={exchangeRate.result.rate}
      user={userSession.user}
    >
      {children}
    </PrivateLayout>
  )
}
