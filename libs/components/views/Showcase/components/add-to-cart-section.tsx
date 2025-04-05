import { ShoppingCart, X } from 'lucide-react'
import React from 'react'
import { cn } from '../../../../utils/cn'
import {
  CartNotebook,
  Notebook
} from '../../../../utils-schema/notebook.schema'
import { useCart } from '../../../../hooks/use-cart'
import { toast } from '../../../shared/ui/use-toast'
import { useTranslations } from 'next-intl'

export default function AddToCartSection({
  className,
  data
}: {
  className?: string
  data: Notebook
}) {
  const [cart, setCart] = useCart()
  const t = useTranslations('showcase.add_to_cart')

  function handleAddToCart() {
    setCart((prevState) => {
      const newCart = [...prevState]
      const isProductAlreadyExist = newCart.find(
        (p) => p.serial_num === data.serial_num
      )

      if (isProductAlreadyExist) {
        toast({
          title: t('already_in_cart'),
          variant: 'destructive'
        })
        return prevState
      }

      const newProduct = {
        item_id: data.item_id,
        mark_name: data.mark_name,
        item_price: data.item_price,
        item_name: data.item_name,
        serial_num: data.serial_num,
        has_icon: data.has_icon
      } satisfies CartNotebook

      newCart.push(newProduct)
      toast({
        title: t('success')
      })
      return newCart
    })
  }

  function handleUnselect() {
    setCart((prevState) => {
      const newCart = prevState.filter((c) => c.serial_num !== data.serial_num)
      toast({
        title: t('deleted')
      })
      return newCart
    })
  }

  const itemInCart = cart.find((c) => c.serial_num === data.serial_num)

  return itemInCart ? (
    <button
      onClick={handleUnselect}
      className={cn(
        'rounded-lg bg-white text-primary place-self-center transition-colors duration-300 p-3 border hover:bg-gray-200',
        className || ''
      )}
    >
      <X />
    </button>
  ) : (
    <button
      id="add-to-cart"
      aria-label="add product to cart"
      onClick={handleAddToCart}
      className={cn(
        'rounded-lg bg-white place-self-center transition-colors duration-300 p-3 border hover:bg-gray-200',
        className || ''
      )}
    >
      <div className="relative">
        <ShoppingCart className="text-primary" />
      </div>
    </button>
  )
}
