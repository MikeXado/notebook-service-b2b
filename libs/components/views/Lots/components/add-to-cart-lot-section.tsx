'use client'
import React from 'react'
import { cn } from '../../../../utils/cn'
import { ShoppingCart } from 'lucide-react'
import { useLotsCart } from '../../../../hooks/use-cart'
import { LotCart } from '../../../../utils-schema/lots.schema'
import { toast } from '../../../shared/ui/use-toast'
import { ifAble, USER_ACTION } from '../../../../permissions/permissions'
import { useTranslations } from 'next-intl'

export default function AddToCartLotSection({
  lot_name,
  lot_sum,
  userActive
}: {
  lot_name: string
  lot_sum: number
  userActive?: number
}) {
  const [, setLotsCart] = useLotsCart()
  const t = useTranslations('lots.add_to_cart')

  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!userActive
  })

  if (!isUserHasPermission) {
    return null
  }

  function handleAddToCart() {
    setLotsCart((prevState) => {
      const newCart = [...prevState]
      const isProductAlreadyExist = newCart.find((p) => p.lot_name === lot_name)

      if (isProductAlreadyExist) {
        toast({
          title: t('already_in_cart'),
          variant: 'destructive'
        })
        return prevState
      }
      const newProduct = {
        lot_name,
        lot_sum
      } satisfies LotCart

      newCart.push(newProduct)

      toast({
        title: t('success')
      })
      return newCart
    })
  }
  return (
    <button
      onClick={handleAddToCart}
      className={cn(
        'rounded-lg bg-white place-self-center transition-colors duration-300 p-3 border hover:bg-gray-200'
      )}
    >
      <ShoppingCart className="text-primary" />
    </button>
  )
}
