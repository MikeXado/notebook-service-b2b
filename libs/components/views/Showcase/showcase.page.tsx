'use client'
import React, { useTransition } from 'react'
import {
  LOTS_ROUTE,
  SHOWCASE_ROUTE,
  SHOWCASE_UNFINISHED_ROUTE
} from '../../../constants/constants'
import { Boxes, Laptop, MonitorCog } from 'lucide-react'
import Image from 'next/image'
import { getAllShowcaseInExcel } from './action'
import { toast } from '../../shared/ui/use-toast'
import { useTranslations } from 'next-intl'
import { Link } from '../../../service/i18n/navigation'

interface SideNavLinkProps {
  to: string
  color?: string
  isActive: boolean
  children: React.ReactNode
}

export default function Showcase() {
  const t = useTranslations('showcase.main')
  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5">
      <h1 className="text-2xl font-medium">{t('title')}</h1>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="relative w-full md:w-1/3 shadow-lg rounded-md bg-white h-fit flex flex-col">
          <div className="flex items-center justify-between p-5">
            <p className="text-base font-medium">{t('aside.title')}</p>
            <ExportAllShowcaseInExcel />
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div>
            <SideNavLink to={SHOWCASE_ROUTE} isActive={false}>
              <Laptop className="text-[#112878] w-8 h-8" />
              {t('nav.ready.title')}
            </SideNavLink>
            <SideNavLink to={SHOWCASE_UNFINISHED_ROUTE} isActive={false}>
              <MonitorCog className="text-[#112878] w-8 h-8" />
              {t('nav.not_ready.title')}
            </SideNavLink>
            <SideNavLink to={LOTS_ROUTE} isActive={false}>
              <Boxes className="text-[#112878] w-8 h-8" />
              {t('aside.lots_title')}
            </SideNavLink>
          </div>
        </div>
        <Banner />
      </div>
    </div>
  )
}

function Banner() {
  const t = useTranslations('showcase.main.nav')
  return (
    <div className="w-full md:w-2/3 relative shadow-lg rounded-md bg-white h-fit flex flex-col">
      <ShowcaseNavigationSectionRow
        imagePath={'showcase.avif'}
        title={t('ready.title')}
        navigateTo={SHOWCASE_ROUTE}
        text={t('ready.description')}
      />
      <ShowcaseNavigationSectionRow
        imagePath={'unfinished.avif'}
        title={t('not_ready.title')}
        navigateTo={SHOWCASE_UNFINISHED_ROUTE}
        text={t('not_ready.description')}
      />
      <ShowcaseNavigationSectionRow
        imagePath={'lots.avif'}
        title={t('lots.title')}
        navigateTo={LOTS_ROUTE}
        text={t('lots.description')}
      />
    </div>
  )
}

function ShowcaseNavigationSectionRow({
  title,
  text,
  navigateTo,
  imagePath
}: {
  title: string
  text: string
  navigateTo: string
  imagePath: string
}) {
  const t = useTranslations('showcase.main')
  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 border-b border-primary-foreground last-of-type:border-none">
      <div className=" flex-shrink-0 flex flex-col gap-3">
        <h2 className="text-2xl font-medium text-primary">{title}</h2>
        <div className="relative w-32 h-32 aspect-[140/120]">
          <Image
            className="w-full"
            src={'/assets/img/' + imagePath}
            fill
            alt="Notebook image"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-secondary-foreground text-base">{text}</p>
        <Link
          href={navigateTo}
          className="hover:text-primary hover:underline underline-offset-2"
        >
          {t('go_to')}
        </Link>
      </div>
    </div>
  )
}

export function SideNavLink({
  to,
  color,
  isActive,
  children
}: SideNavLinkProps): JSX.Element {
  return (
    <Link
      prefetch={true}
      href={to}
      className={`flex items-center gap-4 
        p-5
        text-light 
        transition-colors duration-300 
        ${isActive ? `bg-${color || 'bg-background'}` : 'hover:bg-background'}
        ${isActive ? 'active' : ''} 
        `}
    >
      {children}
    </Link>
  )
}

function ExportAllShowcaseInExcel() {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('showcase.export')

  function handleExportExcel() {
    startTransition(async () => {
      try {
        const xlsx = await getAllShowcaseInExcel()
        const link = document.createElement('a')
        link.href = xlsx
        link.download = `showcase.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        toast({
          title: t('error'),
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <button
      disabled={isPending}
      className="rounded-lg flex items-center gap-2 p-2 bg-white border border-primary text-primary text-sm hover:bg-gray-100 transition-colors duration-300"
      onClick={handleExportExcel}
    >
      <Image
        src="/assets/icons/excel.svg"
        className="fill:bg-white"
        width={18}
        height={18}
        alt="excel"
      />
      <span>{t('title')}</span>
    </button>
  )
}
