import React, { Suspense } from 'react'
import SignUp from '../../libs/components/views/Registration/Registration'

export default function Page() {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  )
}
