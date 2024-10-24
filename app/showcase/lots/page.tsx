import React from 'react'
import { Breadcrumbs } from '../../../libs/components/shared/ui/breadcrumbs'
import { fetchWrapper } from '../../../libs/service/fetch-wrapper'
import { LotsDto } from '../../../libs/utils-schema/lots.schema'
import { API_LOTS } from '../../../libs/constants/constants'
import EmptyResult from '../../../libs/components/shared/errorComponents/empty-result'
import LotRow from '../../../libs/components/views/Lots/components/lot-row'
import AddToCartLotSection from '../../../libs/components/views/Lots/components/add-to-cart-lot-section'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../../../libs/service/auth-options'

export default async function Lots() {
  const [userSession, lotsResponse] = await Promise.all([
    getServerSession(nextAuthOptions),
    fetchWrapper<unknown, LotsDto>({ url: API_LOTS })
  ])

  const { lots } = lotsResponse.result

  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <h1 className="text-2xl font-medium">Лоты</h1>
      {lots.length === 0 ? (
        <EmptyResult />
      ) : (
        lots.map((lot, index) => (
          <div
            key={lot.lot_name + '_' + index}
            className="bg-white p-3 shadow rounded-lg flex flex-col gap-5"
          >
            <p className="font-medium">{lot.lot_name}</p>
            <LotRow lots={lot.items} />
            <div className="flex items-center justify-end gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-secondary-foreground text-sm">Цена лота</p>
                <span className="font-medium">{lot.lot_sum}</span>
              </div>
              <AddToCartLotSection
                userActive={userSession.user.active}
                lot_name={lot.lot_name}
                lot_sum={lot.lot_sum}
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}
