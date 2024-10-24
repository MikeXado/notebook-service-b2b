import { getServerSession } from 'next-auth'
import { API_ROOT } from '../constants/constants'
import { nextAuthOptions } from './auth-options'

export type FetchOptions<D> = {
  url: string
  method?: string
  data?: D
  headers?: Record<string, string>
}

export async function getAuthSessionOrThrow() {
  const session = await getServerSession(nextAuthOptions)
  if (!session?.jwt || !session.user) {
    throw new Error('User not authenticated')
  }

  return {
    user: session.user,
    jwt: session.jwt
  }
}

export async function fetchWrapper<D, T>(
  args: FetchOptions<D>
): Promise<{ success: boolean; message: string; result: T | null }> {
  const session = await getAuthSessionOrThrow() //Do not call getServerSession on try/catch
  try {
    const { url, method, data, headers } = args
    const newHeaders: HeadersInit = {
      Authorization: `${session.jwt?.auth_token}`,
      ...headers
    }

    if (!(data instanceof FormData)) {
      newHeaders['Content-Type'] = 'application/json'
    }

    const requestBody = data
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined
    const response = await fetch(`${API_ROOT}/${url}`, {
      method,
      body: requestBody,
      headers: newHeaders
    })

    const result = await response.json()

    if (result.error !== 0) {
      return {
        success: false,
        message: result.err_msg,
        result: null
      }
    }

    return {
      success: true,
      message: null,
      result
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
