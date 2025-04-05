'use client'
import React from 'react'
import { routing } from '../../../service/i18n/routing'
import { cn } from '../../../utils/cn'
import { useLocale } from 'next-intl'
import { usePathname, Link } from '../../../service/i18n/navigation'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './dropdown-menu'

export default function LanguageSelector({
  className
}: {
  className?: string
}) {
  const pathname = usePathname()
  const locale = useLocale()
  const languages = routing.locales

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)}>
        {locale}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2">
        {languages.map((lang) => (
          <DropdownMenuItem asChild key={lang}>
            <Link
              data-selected={lang === locale}
              className="uppercase data-[selected=true]:bg-primary cursor-pointer data-[selected=true]:text-white"
              href={pathname}
              locale={lang}
              prefetch={true}
            >
              {lang}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
