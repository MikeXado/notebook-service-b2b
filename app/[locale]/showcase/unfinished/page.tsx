import React, { Suspense } from 'react'
import ShowcaseCategoryPage from '../../../../libs/components/views/Showcase/showcase-category.page'
import { Breadcrumbs } from '../../../../libs/components/shared/ui/breadcrumbs'
import { Loading } from '../../../../libs/components/shared/styled/loading'

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams?.page) || 1

  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-24">
            <Loading />
          </div>
        }
      >
        <ShowcaseCategoryPage
          page={page}
          category="unfinished"
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  )
}
