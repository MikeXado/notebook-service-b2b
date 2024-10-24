'use server'

import { API_REGISTER, API_ROOT } from '../../../constants/constants'
import {
  RegisterDtoFormSchema,
  RegisterResponse
} from '../../../utils-schema/auth.schema'

export async function registerUser(values: RegisterDtoFormSchema) {
  try {
    if (!values.agree) {
      return {
        success: false,
        message: 'Вы должны согласиться с условиями использования'
      }
    }

    if (!values.captcha) {
      return {
        success: false,
        message: 'Вы должны подтвердить что вы не робот'
      }
    }
    const formData = new FormData()
    const data = values.data
    formData.append('cname', data.cname)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('fio', data.fio)
    formData.append('phone', data.phone)
    formData.append('telegram', data.telegram)
    const response = await fetch(`${API_ROOT}` + '/' + `${API_REGISTER}`, {
      method: 'POST',
      body: formData
    })

    const result = (await response.json()) as RegisterResponse
    if (result.error !== 0) {
      return {
        success: false,
        message: result.err_msg
      }
    }

    return {
      success: true,
      message: 'Регистрация прошла успешна'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Ошибка при регистрации'
    }
  }
}
