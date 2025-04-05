'use client'
import React, { useEffect, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { LoginDto } from '../../../utils-schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import StyledHeader from '../../shared/layouts/styled-header'
import Image from 'next/image'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { Input } from '../../shared/ui/input'
import { cn } from '../../../utils/cn'
import { toast } from '../../shared/ui/use-toast'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '../../../service/i18n/navigation'

export const defaultFormState = {
  email: '',
  password: ''
}

export default function SignIn() {
  const t = useTranslations('auth.sign_in')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isLoading, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDto>({
    defaultValues: defaultFormState,
    resolver: zodResolver(LoginDto)
  })

  useEffect(() => {
    if (error) {
      toast({
        title: t('auth_error'),
        variant: 'destructive'
      })
    }
  }, [error, t])

  function onsubmit(data: LoginDto) {
    startTransition(async () => {
      const response = await signIn('credentials', {
        ...data,
        callbackUrl: '/showcase'
      })

      if (!response || !response?.ok) {
        toast({
          title: t('auth_error'),
          variant: 'destructive'
        })
      }

      if (!error) {
        toast({
          title: t('auth_success'),
          variant: 'default'
        })
      }
    })
  }

  return (
    <>
      <StyledHeader>
        <header className="max-w-[1440px] w-full px-2 flex items-center">
          <Link href="/">
            <Image
              src={'/assets/icons/logo.svg'}
              alt="logo"
              width={194}
              height={29}
            />
          </Link>
        </header>
      </StyledHeader>
      <PublicContentContainer>
        <div className="mt-24 max-w-[500px] mx-auto w-full md:w-1/2 h-full flex px-5 justify-center items-start md:items-center">
          <div className="w-full flex items-center">
            <div className="w-full h-full flex flex-col gap-10">
              <div className="mt-auto flex flex-col gap-2">
                <h1 className="text-2xl font-medium">{t('title')}</h1>

                <form
                  onSubmit={handleSubmit(onsubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="form-inputs-wrapper pt-10">
                    <div className="flex flex-col items-center">
                      <label className="w-full">{t('email')}</label>
                      <Input
                        type="email"
                        placeholder={t('email_placeholder')}
                        {...register('email', { required: true })}
                        className={cn(
                          'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-[#112878] hover:border-[#112878]',
                          errors.email ? 'border-red-500' : ''
                        )}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="w-full">{t('password')}</label>
                      <Input
                        type="password"
                        placeholder={t('password_placeholder')}
                        {...register('password', { required: true })}
                        className={cn(
                          'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-[#112878] hover:border-[#112878]',
                          errors.password ? 'border-red-500' : ''
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      className="text-center text-white rounded-lg transition-all py-2 px-5 bg-[#112878]  duration-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        t('login')
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-auto w-full text-center flex justify-center">
                <p className="text-[#818895] text-sm">
                  {t('noAccount')}
                  <Link className="text-base text-[#112878]" href="/sign-up">
                    {t('register')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PublicContentContainer>
    </>
  )
}
