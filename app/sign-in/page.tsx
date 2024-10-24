import React, { Suspense } from 'react'
import SignIn from '../../libs/components/views/Login/Login'

export default function Page() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  )
}
