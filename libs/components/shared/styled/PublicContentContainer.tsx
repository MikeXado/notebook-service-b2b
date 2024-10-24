import React from 'react'
import Image from 'next/image'

export const PublicContentContainer = ({ children }) => {
  return (
    <div className="bg-white max-w-[1170px] mx-auto rounded-lg">
      <div className="flex gap-10 flex-col lg:flex-row">
        {children}
        <div className="w-full justify-center lg:justify-end lg:w-1/2 h-full hidden lg:flex">
          <Image
            className="w-auto h-auto rounded-r-lg"
            src="/assets/img/notebook.avif"
            width={560}
            height={670}
            alt="Notebook illustration"
          />
        </div>
      </div>
    </div>
  )
}
