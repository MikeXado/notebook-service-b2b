'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

export default function UserName({ username }: { username: string }) {
  return (
    <>
      <div className="flex">
        <div className="min-[1000px]:text-right">
          <p className="text-sm font-medium">{username}</p>
          <a
            className="text-sm text-[#112878]"
            href="#"
            onClick={() => {
              signOut({ callbackUrl: '/sign-in' })
            }}
          >
            Выйти
          </a>
        </div>
      </div>
    </>
  )
}
