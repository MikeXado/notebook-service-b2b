import React from 'react'

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../constants/constants'
import Image from 'next/image'
import Link from 'next/link'
import { PublicContentContainer } from '../shared/styled/PublicContentContainer'
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '../../service/auth-options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)
  return (
    <div className="h-full w-full justify-center">
      <PublicContentContainer>
        <div className="flex items-center  md:w-2/3">
          <div className="flex flex-col gap-10 max-w-[600px] py-5 mx-auto px-5">
            <Image
              src="/assets/icons/logo.svg"
              width={194}
              height={29}
              alt="logo"
            />

            <h1 className="text-2xl font-medium">
              Оптовый портал ноутбуков и комплектующих
            </h1>

            <div className="flex gap-x-4">
              {session?.jwt ? (
                <Link
                  className="text-center text-white rounded-lg transition-all py-2 px-5 bg-blue-500 hover:bg-blue-600 duration-300"
                  href="/showcase"
                >
                  Витрина
                </Link>
              ) : (
                <>
                  <Link
                    className="text-center text-white rounded-lg transition-all py-2 px-5 bg-blue-500 hover:bg-blue-600 duration-300"
                    href={REGISTRATION_ROUTE}
                  >
                    Регистрация
                  </Link>
                  <Link
                    className="text-center py-2 transition-all duration-300 px-5 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white"
                    href={LOGIN_ROUTE}
                  >
                    Вход
                  </Link>{' '}
                </>
              )}
            </div>
          </div>
        </div>
      </PublicContentContainer>
    </div>
  )
}
