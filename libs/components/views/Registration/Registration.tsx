'use client'
import React, { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { RegisterDtoFormSchema } from '../../../utils-schema/auth.schema'
import StyledHeader from '../../shared/layouts/styled-header'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { Input } from '../../shared/ui/input'
import ClientCaptcha from './components/client-captcha'
import { Checkbox } from '../../shared/ui/checkbox'
import { registerUser } from './action'
import { cn } from '../../../utils/cn'
import { toast } from '../../shared/ui/use-toast'

export default function SignUp() {
  const [isLoading, startTransition] = useTransition()
  const [captcha, setCapcha] = useState('')
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || ''
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterDtoFormSchema>({
    defaultValues: {
      captcha: false,
      agree: false,
      data: {
        fio: '',
        email: '',
        password: '',
        cname: '',
        phone: '',
        telegram: ''
      }
    },
    resolver: zodResolver(RegisterDtoFormSchema)
  })

  function onsubmit(values: RegisterDtoFormSchema) {
    startTransition(async () => {
      const response = await registerUser(values)

      toast({
        title: response.message,
        variant: response.success ? 'default' : 'destructive'
      })

      redirect('/sign-in')
    })
  }

  console.log(errors)
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
      <div className="pt-20">
        <PublicContentContainer>
          <div className="py-10 lg:py-20 max-w-[800px] mx-auto w-full lg:w-1/2 lg:max-h-[650px] flex px-5 justify-center items-start md:items-center">
            <div className="w-full flex items-center">
              <div className="w-full h-full flex flex-col gap-10">
                <div className="mt-auto flex flex-col gap-2">
                  <h1 className="text-2xl font-medium">Регистрация</h1>

                  <form
                    onSubmit={handleSubmit(onsubmit)}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col gap-5 pt-10">
                      <div className="flex items-center gap-2 flex-col sm:flex-row w-full">
                        <div className="flex flex-col items-center w-full">
                          <label className="w-full">Название фирмы</label>
                          <Input
                            type="text"
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.cname && 'border-red-500'
                            )}
                            placeholder="Введите название фирмы"
                            {...register('data.cname', { required: true })}
                          />
                        </div>
                        <div className="flex flex-col items-center w-full">
                          <label className="w-full">Имя и фамилия</label>
                          <Input
                            type="text"
                            placeholder="Введите ваше имя"
                            {...register('data.fio', { required: true })}
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.fio && 'border-red-500'
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-col sm:flex-row">
                        <div className="flex flex-col items-center w-full">
                          <label className="w-full">Эл. почта (login)</label>
                          <Input
                            type="email"
                            placeholder="Введите эл. почту"
                            {...register('data.email', { required: true })}
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.email && 'border-red-500'
                            )}
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <label className="w-full">Пароль</label>
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            {...register('data.password', { required: true })}
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.password && 'border-red-500'
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-col sm:flex-row">
                        <div className="flex flex-col w-full">
                          <label className="w-full">Телефон</label>
                          <Input
                            placeholder="Введите ваш номер телефона"
                            {...register('data.phone', { required: true })}
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.phone && 'border-red-500'
                            )}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="w-full">Telegram</label>
                          <Input
                            placeholder="Введите ваш логин telegram"
                            {...register('data.telegram', { required: true })}
                            className={cn(
                              'h-9 border-[#EAEEF1] focus-visible:outline-none focus:border-primary hover:border-primary',
                              errors.data?.telegram && 'border-red-500'
                            )}
                          />
                        </div>
                      </div>
                      <ClientCaptcha
                        height={38}
                        width={100}
                        captchaCode={setCapcha}
                      />

                      <Controller
                        name="captcha"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            placeholder="Введите символы"
                            onChange={(e) =>
                              field.onChange(e.target.value === captcha)
                            }
                          />
                        )}
                      />

                      <div className="w-full items-center gap-2 flex justify-center">
                        <Controller
                          control={control}
                          name="agree"
                          rules={{ required: true }}
                          render={({ field }) => {
                            return (
                              <Checkbox
                                className="text-[#112878] fill-[#112878]"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            )
                          }}
                        />
                        <p className="text-[#818895] text-sm">
                          Я согласен с условиями{' '}
                          <Link className="text-base text-[#112878]" href="/">
                            политики конфиденциальности
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <button
                        className="text-center text-white rounded-lg transition-all py-2 px-5 bg-[#112878]  duration-500"
                        disabled={isLoading}
                      >
                        Зарегистрироваться
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-auto w-full text-center flex justify-center">
                  <p className="text-[#818895] text-sm">
                    У вас уже есть аккаунт?{' '}
                    <Link className="text-base text-[#112878]" href="/sign-in">
                      Войдите
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PublicContentContainer>
      </div>
    </>
  )
}
