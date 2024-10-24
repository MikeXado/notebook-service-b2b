import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { cn } from '../../../../utils/cn'
import {
  CartNotebook,
  Notebook
} from '../../../../utils-schema/notebook.schema'
import { useCart } from '../../../../hooks/use-cart'
import { toast } from '../../../shared/ui/use-toast'

export default function AddToCartSection({
  className,
  data
}: {
  className?: string
  data: Notebook
}) {
  const [, setCart] = useCart()

  function handleAddToCart() {
    setCart((prevState) => {
      const newCart = [...prevState]
      const isProductAlreadyExist = newCart.find(
        (p) => p.serial_num === data.serial_num
      )

      if (isProductAlreadyExist) {
        toast({
          title: 'Товар уже есть в корзине',
          variant: 'destructive'
        })
        return prevState
      }

      const newProduct = {
        item_id: data.item_id,
        mark_name: data.mark_name,
        item_price: data.item_price,
        item_name: data.item_name,
        serial_num: data.serial_num
      } satisfies CartNotebook

      newCart.push(newProduct)
      toast({
        title: 'Товар добавлен в корзину'
      })
      return newCart
    })
  }

  return (
    <button
      id="add-to-cart"
      aria-label="add product to cart"
      onClick={handleAddToCart}
      className={cn(
        'rounded-lg bg-white place-self-center transition-colors duration-300 p-3 border hover:bg-gray-200',
        className
      )}
    >
      <ShoppingCart className="text-primary" />
    </button>
  )
}
