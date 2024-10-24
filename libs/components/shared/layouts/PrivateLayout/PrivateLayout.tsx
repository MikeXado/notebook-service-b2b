import React from 'react'
import StyledHeader from '../styled-header'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { NOT_ACTIVE_PHONE } from '../../../../constants/constants'
import Navigation from './Navigation'
import UserName from './UserName'
import MobileNavbar from './MobileNavbar'
import { User } from '../../../../utils-schema/auth.schema'

export default function PrivateLayout({
  currencyName,
  rate,
  numberOrders,
  user,
  children
}: {
  currencyName: string
  rate: number
  numberOrders: number
  user: User
  children: React.ReactNode
}) {
  return (
    <>
      <StyledHeader>
        <div className="max-w-[1170px] px-2 w-full h-full gap-10 items-center justify-between flex">
          <Link href="/">
            <Image
              priority={true}
              src="/assets/icons/logo.svg"
              alt="logo"
              width={194}
              height={29}
            />
          </Link>

          <div className="items-center justify-between gap-5 h-full w-full hidden min-[1000px]:flex">
            <Info currencyName={currencyName} rate={rate} user={user} />
            <Navigation numberOrders={numberOrders} />
            <UserName username={user.client_name} />
          </div>

          <div className="min-[1000px]:hidden block">
            <MobileNavbar
              currency_name={currencyName}
              rate={rate}
              numberOrders={numberOrders}
              user={user}
            />
          </div>
        </div>
      </StyledHeader>
      <div className="pt-20">{children}</div>
    </>
  )
}

export function Info({
  currencyName,
  rate,
  user
}: {
  currencyName: string
  rate: number
  user: User
}) {
  return (
    <div className="flex gap-5 min-[1000px]:gap-8 min-[1000px]:flex-row flex-col">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Курс</p>
        <p className="text-sm text-[#818895]">
          {currencyName} {rate}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Баланс</p>
        <p className="text-sm text-[#818895]">
          {user?.balance || 0} {currencyName}
        </p>
      </div>

      <div className="flex flex-col min-[1000px]:gap-1 gap-5">
        {user?.active ? (
          <div className="flex flex-col min-[1000px]:flex-row min-[1000px]:items-center gap-1">
            <p className="text-sm text-[#818895]">Ваш менеджер:</p>
            <p className="text-sm font-medium">{user?.mngr_name}</p>
          </div>
        ) : (
          <p className="text-sm font-medium">
            Для оформления заказа свяжитесь с менеджером
          </p>
        )}
        <div className="text-sm flex items-center gap-1 font-medium">
          <div className="bg-[#112878] w-5 h-5 rounded-full flex items-center justify-center">
            <Phone className="text-white w-3 h-3" fill="white" />
          </div>
          {user?.active ? user?.mngr_phone : NOT_ACTIVE_PHONE}
        </div>
      </div>
    </div>
  )
}
