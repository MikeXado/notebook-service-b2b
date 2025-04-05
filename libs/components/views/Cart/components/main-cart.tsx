import React, { useTransition } from 'react'
import { useCart, useLotsCart } from '../../../../hooks/use-cart'
import { NotebooksCart } from './notebooks-cart'
import { LotsCart } from './lots-cart'
import { getSumCounts } from '../service'
import { placeOrder } from '../action'
import { toast } from '../../../shared/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
export function MainCart({
  rate,
  currencyName,
  userDiscountPercent
}: {
  rate: number
  currencyName: string
  userDiscountPercent?: number
}) {
  const [cart, setCart] = useCart()
  const [lotsCart, setLotsCart] = useLotsCart()
  const [isPending, startTransition] = useTransition()
  const { currentSum, discountTotal, sumDiff } = getSumCounts(
    cart,
    lotsCart,
    userDiscountPercent || 0
  )
  const t = useTranslations('cart')
  const currentSumInUAH = Math.floor((currentSum || 0) * rate)
  const sumDiffInUAH = Math.floor((sumDiff || 0) * rate)
  const isLotsCartEmpty = !lotsCart?.length
  const isNotebooksCartEmpty = !cart?.length

  function doOrder() {
    startTransition(async () => {
      try {
        const response = await placeOrder(lotsCart, cart)

        toast({
          title: response.message,
          variant: response.success ? 'default' : 'destructive'
        })

        if (response.success) {
          setCart([])
          setLotsCart([])
        }
      } catch {
        toast({
          title: t('unknown_error'),
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-col gap-5">
        {!isNotebooksCartEmpty && (
          <NotebooksCart
            currencyName={currencyName}
            rate={rate}
            userDiscountPercent={userDiscountPercent}
          />
        )}

        {!isLotsCartEmpty && (
          <LotsCart rate={rate} currencyName={currencyName} />
        )}
      </div>

      <div className="lg:col-span-1 bg-white p-3 rounded-lg shadow flex flex-col gap-5">
        <p className="font-medium">{t('total')}</p>

        <div className="flex flex-col gap-2">
          <p className="flex items-center justify-between">
            {t.rich('total_items', {
              length: cart.length + lotsCart.length,
              price: () => (
                <span className="font-medium">
                  {currentSum} ({currentSumInUAH} UAH)
                </span>
              )
            })}
          </p>

          {discountTotal || 0 > 0 ? (
            <p className="flex items-center justify-between">
              {t.rich('discount', {
                discount: () => (
                  <span className="font-medium">
                    {discountTotal} ({userDiscountPercent || 0}%)
                  </span>
                )
              })}
            </p>
          ) : null}

          <p className="flex items-center justify-between">
            {t.rich('total_price', {
              price: () => (
                <span className="font-medium">
                  {sumDiff} ({sumDiffInUAH} UAH)
                </span>
              )
            })}
          </p>
        </div>
        <button
          disabled={isPending}
          onClick={doOrder}
          className="bg-primary border border-primary text-white flex items-center justify-center rounded-lg py-3 px-2 font-medium hover:bg-none transition-colors duration-300"
        >
          {isPending ? <Loader2 className="animate-spin" /> : t('submit')}
        </button>
      </div>
    </div>
  )
}
