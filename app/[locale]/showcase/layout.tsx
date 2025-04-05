import React from 'react'
import PrivateLayout from '../../../libs/components/shared/layouts/PrivateLayout/PrivateLayout'
import { API_GET_EXRATE, API_ORDERS } from '../../../libs/constants/constants'
import { ExchangeRateDto } from '../../../libs/utils-schema/exrate.schema'
import { OrderDto } from '../../../libs/utils-schema/order.schema'
import {
  fetchWrapper,
  getUserOrThrow
} from '../../../libs/service/fetch-wrapper'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const [userSession, exchangeRate, orders] = await Promise.all([
    getUserOrThrow(),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    }),
    fetchWrapper<unknown, OrderDto>({
      url: API_ORDERS
    })
  ])

  return (
    <PrivateLayout
      numberOrders={orders.result?.orders.length || 0}
      currencyName={exchangeRate?.result?.currency_name || 'USD'}
      rate={exchangeRate.result?.rate || 0}
      user={userSession}
    >
      {children}
    </PrivateLayout>
  )
}
