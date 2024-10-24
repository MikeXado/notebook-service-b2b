import React from 'react'

import { OrderRow } from './components/OrderRow/order-row'
import { API_MANAGER, API_ORDERS } from '../../../constants/constants'
import { ifAble, USER_ACTION } from '../../../permissions/permissions'
import {
  fetchWrapper,
  getAuthSessionOrThrow
} from '../../../service/fetch-wrapper'
import { OrderDto } from '../../../utils-schema/order.schema'
import { ManagerDto } from '../../../utils-schema/manager.schema'
import { Breadcrumbs } from '../../shared/ui/breadcrumbs'
import { ErrorNotActiveUser } from '../../shared/errorComponents/error-non-active-user'
import { ManagerCard } from './components/manager-card'

const PAGE_TITLE = 'Мои заказы'

export async function OrdersPage() {
  const [session, ordersResponse, managerInfo] = await Promise.all([
    getAuthSessionOrThrow(),
    fetchWrapper<unknown, OrderDto>({ url: API_ORDERS }),
    fetchWrapper<unknown, ManagerDto>({ url: API_MANAGER })
  ])

  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!session.user?.active
  })

  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <h1 className="text-2xl font-medium">{PAGE_TITLE}</h1>
      {isUserHasPermission ? (
        <div className="flex flex-col-reverse w-full md:grid md:grid-cols-4 md:items-start gap-5">
          <ManagerCard managerInfo={managerInfo.result} />
          <div className="md:col-span-3 w-full flex flex-col gap-2">
            {ordersResponse.result.orders.map((order) => (
              <OrderRow key={order.order_id} order={order} />
            ))}
          </div>
        </div>
      ) : (
        <ErrorNotActiveUser />
      )}
    </div>
  )
}
