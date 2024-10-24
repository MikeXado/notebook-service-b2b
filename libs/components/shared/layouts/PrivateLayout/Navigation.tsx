'use client'
import React from 'react'
import {
  ORDERS_ROUTE,
  SHOPPING_CART_ROUTE
} from '../../../../constants/constants'
import Link from 'next/link'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { useCart, useLotsCart } from '../../../../hooks/use-cart'

export default function Navigation({ numberOrders }: { numberOrders: number }) {
  const [notebooksCart] = useCart()
  const [lostCart] = useLotsCart()

  const isSomethingOrdered = numberOrders > 0

  const numberItemsInCart =
    (notebooksCart?.length || 0) + (lostCart?.length || 0)
  const isSomethingInCart = numberItemsInCart > 0

  return (
    <div className="min-[1000px]:h-full flex">
      <Link
        className={`border-[#EAEEF1] transition-colors duration-300 h-full px-4 flex items-center justify-center border-r first-of-type:border-l hover:bg-[#EAEEF1]`}
        href={ORDERS_ROUTE}
      >
        <div className="relative">
          {isSomethingOrdered && <Badge>{numberOrders}</Badge>}
          <ShoppingBag className="text-[#818895]" />
        </div>
      </Link>

      <Link
        className={`border-[#EAEEF1]  transition-colors duration-300 px-4 border-r first-of-type:border-l flex items-center justify-center hover:bg-[#EAEEF1]`}
        href={SHOPPING_CART_ROUTE}
      >
        <div className="relative">
          {isSomethingInCart && <Badge>{numberItemsInCart}</Badge>}
          <ShoppingCart className="text-[#818895]" />
        </div>
      </Link>
    </div>
  )
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`absolute -right-1 -top-1 flex justify-center items-center bg-[#112878] rounded-full text-white text-xs h-4 w-4 p-1`}
    >
      {children}
    </div>
  )
}
