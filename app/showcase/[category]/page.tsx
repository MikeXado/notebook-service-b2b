import React, { Suspense } from 'react'
import ShowcaseCategoryPage from '../../../libs/components/views/Showcase/showcase-category.page'
import { Breadcrumbs } from '../../../libs/components/shared/ui/breadcrumbs'
import PageTitleSection from '../../../libs/components/views/Showcase/components/page-title.section'
import {
  API_FILTERS,
  API_FILTERS_UNFINISHED
} from '../../../libs/constants/constants'
import { fetchWrapper } from '../../../libs/service/fetch-wrapper'
import { FilterDto } from '../../../libs/utils-schema/filter.schema'
import { Loader2 } from 'lucide-react'

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const category = params.category
  const FILTERS_API =
    category === 'unfinished' ? API_FILTERS_UNFINISHED : API_FILTERS

  const filters = await fetchWrapper<unknown, FilterDto>({ url: FILTERS_API })

  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <PageTitleSection
        title={renderTextByCategory[category].title}
        subtitle={renderTextByCategory[category].subtitle}
        filters={filters.result}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 text-primary h-10 animate-spin" />
          </div>
        }
      >
        <ShowcaseCategoryPage
          page={page}
          category={category}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  )
}

const renderTextByCategory: Record<
  string,
  Record<'title' | 'subtitle', string>
> = {
  finished: {
    title: 'Готовые',
    subtitle: 'Гарантия на все ноутбуки с Витрины - 1 месяц.'
  },
  unfinished: {
    title: 'Не готовые ноутбуки',
    subtitle: "Гарантия на 'Не готовые' ноутбуки не предоставляется."
  }
}
