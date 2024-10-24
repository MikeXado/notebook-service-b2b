import React from 'react'

export default function StyledHeader({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`w-full fixed flex justify-center h-16 bg-white shadow-lg z-20 pl-[calc(100vw-100%)]`}
    >
      {children}
    </div>
  )
}
