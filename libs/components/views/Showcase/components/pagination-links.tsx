'use client'
import React, { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../../shared/ui/pagination'
import { cn } from '../../../../utils/cn'
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams
} from 'next/navigation'

const PAGES_PER_BLOCK = 3

export default function PaginationLinks({
  totalPages
}: {
  totalPages: number
}) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const totalPagesArray = Array.from({ length: totalPages })

  const currentBlockStart =
    Math.floor((currentPage - 1) / PAGES_PER_BLOCK) * PAGES_PER_BLOCK + 1
  const currentBlockEnd = Math.min(
    currentBlockStart + PAGES_PER_BLOCK - 1,
    totalPages
  )

  return (
    <Pagination className="w-full">
      <PaginationContent className="">
        <PaginationItem>
          <PaginationPrevious
            className="flex items-center px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            href={`?${changePageSearchParam(searchParams.toString(), currentPage === 1 ? currentPage : currentPage - 1)}`}
          />
        </PaginationItem>

        {totalPagesArray
          .slice(currentBlockStart - 1, currentBlockEnd)
          .map((_, index) => {
            const pageIndex = currentBlockStart + index
            return (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  isActive={currentPage === pageIndex}
                  className={cn(
                    'px-3 py-2 rounded-lg border border-primary hover:bg-primary hover:text-white transition-colors duration-300 ',
                    currentPage === pageIndex && 'bg-primary text-white'
                  )}
                  href={`?${changePageSearchParam(searchParams.toString(), pageIndex)}`}
                >
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            )
          })}

        {currentBlockEnd < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentBlockEnd !== totalPages && (
          <PaginationItem>
            <PaginationLink
              className="px-3 py-2 rounded-lg border border-primary hover:bg-primary hover:text-white transition-colors duration-300"
              href={`?${changePageSearchParam(searchParams.toString(), totalPages)}`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className="flex items-center px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            href={`?${changePageSearchParam(searchParams.toString(), currentPage < totalPages ? currentPage + 1 : totalPages)}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function changePageSearchParam(searchParams: string, newParam: number) {
  const newSearchParams = new URLSearchParams(searchParams)
  newSearchParams.set('page', newParam.toString())
  return newSearchParams.toString()
}
