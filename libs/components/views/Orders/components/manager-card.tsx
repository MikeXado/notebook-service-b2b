import React from 'react'
import { ManagerDto } from '../../../../utils-schema/manager.schema'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function ManagerCard({ managerInfo }: { managerInfo: ManagerDto }) {
  const t = useTranslations('orders')
  return (
    <div className="md:col-span-1 bg-white p-3 rounded-lg shadow flex flex-col gap-5 ">
      <p className="text-center text-sm">{t('manager')}</p>
      <p className="text-sm text-center font-medium">
        {managerInfo?.mngr_name}
      </p>

      <Image
        src={`${process.env['NEXT_PUBLIC_MEDIA_URL']}/img/mngr_photos/${managerInfo.mngr_telegram}/icon.jpg`}
        alt="Photo of the manager"
        width={462}
        height={593}
      />

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
