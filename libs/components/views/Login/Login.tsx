'use client'
import React, { useEffect, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { LoginDto } from '../../../utils-schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import StyledHeader from '../../shared/layouts/styled-header'
import Link from 'next/link'
import Image from 'next/image'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { Input } from '../../shared/ui/input'
import { cn } from '../../../utils/cn'
import { toast } from '../../shared/ui/use-toast'

export const defaultFormState = {
  email: '',
  password: ''
}

export default function SignIn() {
  const [isLoading, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || ''
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDto>({
    defaultValues: defaultFormState,
    resolver: zodResolver(LoginDto)
  })

  function onsubmit(data: LoginDto) {
    startTransition(async () => {
      try {
        await signIn('credentials', {
          ...data,
          callbackUrl: '/showcase'
        })
      } catch (e) {
        toast({
          title: e.message,
          variant: 'destructive'
        })
      }
    })
  }

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        variant: 'destructive'
      })
    }
  }, [error])
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
                <h1 className="text-2xl font-medium">Вход</h1>

                <form
                  onSubmit={handleSubmit(onsubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="form-inputs-wrapper pt-10">
                    <div className="flex flex-col items-center">
                      <label className="w-full">Эл. почта (login)</label>
                      <Input
                        type="email"
                        placeholder="Введите эл. почту"
                        {...register('email', { required: true })}
                        className={cn(
                          'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-[#112878] hover:border-[#112878]',
                          errors.email && 'border-red-500'
                        )}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="w-full">Пароль</label>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        {...register('password', { required: true })}
                        className={cn(
                          'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-[#112878] hover:border-[#112878]',
                          errors.password && 'border-red-500'
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      className="text-center text-white rounded-lg transition-all py-2 px-5 bg-[#112878]  duration-500"
                      disabled={isLoading}
                    >
                      Войти
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-auto w-full text-center flex justify-center">
                <p className="text-[#818895] text-sm">
                  У вас ещё нет аккаунта?{' '}
                  <Link className="text-base text-[#112878]" href="/sign-up">
                    Зарегистрируйтесь
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
