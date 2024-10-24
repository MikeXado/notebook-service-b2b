import React from 'react'
import { ManagerDto } from '../../../../utils-schema/manager.schema'
import Image from 'next/image'

export function ManagerCard({ managerInfo }: { managerInfo: ManagerDto }) {
  return (
    <div className="md:col-span-1 bg-white p-3 rounded-lg shadow flex flex-col gap-5 ">
      <p className="text-center text-sm">Ваш менеджер</p>
      <p className="text-sm text-center font-medium">
        {managerInfo?.mngr_name}
      </p>

      <div className="w-full aspect-square relative">
        <Image
          src={'data:image/png;base64,' + managerInfo?.mngr_photo}
          alt="Photo of the manager"
          fill
        />
      </div>

      {managerInfo?.mngr_phone && (
        <p className="flex items-center gap-2">
          <Image
            src="/assets/icons/phone.svg"
            width={16}
            height={16}
            alt="phone logo"
          />{' '}
          {managerInfo.mngr_phone}
        </p>
      )}

      {managerInfo?.mngr_telegram && (
        <p className="flex items-center gap-2">
          <Image
            src="/assets/icons/telegram.svg"
            width={16}
            height={16}
            alt="telegram logo"
          />{' '}
          {managerInfo.mngr_telegram}
        </p>
      )}

      {managerInfo?.mngr_viber && (
        <p className="flex items-center gap-2">
          <Image
            src="/assets/icons/viber.svg"
            width={16}
            height={16}
            alt="viber logo"
          />{' '}
          {managerInfo.mngr_viber}
        </p>
      )}
    </div>
  )
}
