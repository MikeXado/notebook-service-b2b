import React from 'react'
import { NotebookImage } from '../../Showcase/components/notebook-image'
import RemoveFromCartSections from './remove-from-cart-section'
import { useCart } from '../../../../hooks/use-cart'
import { getDiscount } from '../../Showcase/utils/get-discount'

export function NotebooksCart({
  rate,
  currencyName,
  userDiscountPercent
}: {
  rate: number
  currencyName: string
  userDiscountPercent?: number
}) {
  const [notebookCart, setCart] = useCart()

  function handleRemoveFromCart(serial_num: string) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart]
      const productIndex = updatedCart.findIndex(
        (product) => product.serial_num === serial_num
      )
      if (productIndex !== -1) {
        updatedCart.splice(productIndex, 1)
      }

      return updatedCart
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-3 h-fit flex flex-col gap-2">
      <p className="font-medium">Ноутбуки</p>

      {notebookCart.map((cart) => {
        return (
          <div
            className="grid md:grid-cols-7 border-b border-gray-200 last-of-type:border-b-0 py-2 "
            key={cart.serial_num}
          >
            <div className="col-span-3 flex items-center justify-center sm:justify-start gap-8">
              <NotebookImage
                isSlider={false}
                mark_name={cart.mark_name}
                serial_num={cart.serial_num}
              />

              <div>
                <p className="text-secondary-foreground">{cart.mark_name}</p>
                <p>{cart.item_name}</p>
                <p className="text-secondary-foreground text-sm">
                  {cart.serial_num}
                </p>
              </div>
            </div>

            <div className="col-span-4 flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <p>Цена:</p>
                <p className="font-medium flex items-center gap-1">
                  <del className="text-secondary-foreground text-sm">
                    {cart.item_price} {currencyName}
                  </del>
                  <span>
                    {getDiscount(cart.item_price, userDiscountPercent || 0)}{' '}
                    {currencyName}
                  </span>
                </p>
                <p className="font-medium">
                  ({Math.floor(cart.item_price * rate)} UAH)
                </p>
              </div>

              <RemoveFromCartSections
                className="place-self-center w-full sm:w-auto flex items-center justify-center"
                onClick={() => handleRemoveFromCart(cart.serial_num)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
