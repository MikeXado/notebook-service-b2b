import Link from 'next/link'
import React from 'react'
import {
  LOTS_ROUTE,
  SHOWCASE_ROUTE,
  SHOWCASE_UNFINISHED_ROUTE
} from '../../../constants/constants'
import { Boxes, Laptop, MonitorCog, ScreenShareOff } from 'lucide-react'
import Image from 'next/image'

interface SideNavLinkProps {
  to: string
  color?: string
  isActive: boolean
  children: React.ReactNode
}

export default function Showcase() {
  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5">
      <h1 className="text-2xl font-medium">Главная</h1>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="relative w-full md:w-1/3 shadow-lg rounded-md bg-white h-fit flex flex-col">
          <p className="text-base font-medium p-5">Каталог</p>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div>
            <SideNavLink to={SHOWCASE_ROUTE} isActive={false}>
              <Laptop className="text-[#112878] w-8 h-8" />
              Готовые
            </SideNavLink>
            <SideNavLink to={SHOWCASE_UNFINISHED_ROUTE} isActive={false}>
              <MonitorCog className="text-[#112878] w-8 h-8" />
              Не готовые
            </SideNavLink>
            <SideNavLink to={LOTS_ROUTE} isActive={false}>
              <Boxes className="text-[#112878] w-8 h-8" />
              Лоты ноутбуков
            </SideNavLink>
          </div>
        </div>
        <Banner />
      </div>
    </div>
  )
}

function Banner() {
  return (
    <div className="w-full md:w-2/3 relative shadow-lg rounded-md bg-white h-fit flex flex-col">
      <ShowcaseNavigationSectionRow
        imagePath={'showcase.avif'}
        title="Готовые"
        navigateTo={SHOWCASE_ROUTE}
        text="Полностью готовые к перепродаже ноутбуки. Они протестированы, укомплектованы, установлено ПО. На них предоставляется 1 неделя на проверку. В комплекте идут зарядные устройства."
      />
      <ShowcaseNavigationSectionRow
        imagePath={'unfinished.avif'}
        title="Не готовые"
        navigateTo={SHOWCASE_UNFINISHED_ROUTE}
        text="Рабочие и не рабочие ноутбуки с дефектами или отсутсвующими частями. Они проверены только на включение. В ремонте не были, продаются как есть, без гарантий и блоков питания"
      />
      <ShowcaseNavigationSectionRow
        imagePath={'lots.avif'}
        title="Лоты"
        navigateTo={LOTS_ROUTE}
        text="В лотах представлены ноутбуки в количестве по акционной цене. Лоты могут включать как рабочие, так и не рабочие ноутбуки."
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
          Перейти в раздел
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
