'use client'
import React, { useState } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import NotebookCard from './notebook-card'
import { NotebookRow } from './notebook-row'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import { useSearchParams } from 'next/navigation'

export default function ShowcaseNotebooks({
  notebooks,
  rate,
  currencyName,
  userActive
}: {
  notebooks: Notebook[]
  rate: number
  currencyName: string
  userActive?: number
}) {
  const [showCards, setShowCards] = useState(false)
  const searchParams = useSearchParams()
  const sortOption = searchParams.get('sort')

  notebooks.sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.item_price - b.item_price
      case 'price_desc':
        return b.item_price - a.item_price
      default:
        return a.item_price - b.item_price
    }
  })

  return (
    <>
      <div className="items-center justify-end gap-2 hidden lg:flex">
        <button
          onClick={() => setShowCards(true)}
          className={cn(
            'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
            showCards ? 'bg-primary text-white' : 'bg-white text-primary'
          )}
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowCards(false)}
          className={cn(
            'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
            showCards ? 'bg-white text-primary' : 'bg-primary text-white'
          )}
        >
          <LayoutList className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:block">
        {!showCards ? (
          <div className="notebook-card-grid">
            {notebooks.map((notebook, index) => (
              <NotebookCard
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                rate={rate}
                userActive={userActive}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {notebooks.map((notebook, index) => (
              <NotebookRow
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                rate={rate}
                currencyName={currencyName}
                userActive={userActive}
              />
            ))}
          </div>
        )}
      </div>

      <div className="notebook-card-grid grid lg:hidden">
        {notebooks.map((notebook, index) => (
          <NotebookCard
            key={`${notebook.item_id}_${index}`}
            notebook={notebook}
            rate={rate}
            userActive={userActive}
          />
        ))}
      </div>
    </>
  )
}
