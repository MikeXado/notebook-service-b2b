import React from 'react'
import { useLotsCart } from '../../../../hooks/use-cart'
import RemoveFromCartSections from './remove-from-cart-section'

export function LotsCart({
  rate,
  currencyName
}: {
  rate: number
  currencyName: string
}) {
  const [lotsCart, setCart] = useLotsCart()

  function handleRemoveFromCart(lot_name: string) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart]
      const productIndex = updatedCart.findIndex(
        (product) => product.lot_name === lot_name
      )
      if (productIndex !== -1) {
        updatedCart.splice(productIndex, 1)
      }

      return updatedCart
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-3 h-fit flex flex-col gap-2">
      <p className="font-medium">Лоты</p>

      {lotsCart.map((cart, index) => {
        return (
          <div
            className="grid sm:grid-cols-3 items-center border-b border-gray-200 last-of-type:border-b-0 py-2 "
            key={cart.lot_name + '_' + index}
          >
            <p className="cols-span-1 text-secondary-foreground">
              {cart.lot_name}
            </p>

            <div className="col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-2 justify-self-end">
                Цена:{' '}
                <p className="font-medium flex items-center gap-2">
                  <span>
                    {cart.lot_sum} {currencyName}
                  </span>
                  <span>({Math.floor(cart.lot_sum * rate)} UAH)</span>
                </p>
              </div>

              <RemoveFromCartSections
                onClick={() => handleRemoveFromCart(cart.lot_name)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
