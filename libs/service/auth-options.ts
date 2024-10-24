import { NextAuthOptions } from 'next-auth'
import { API_ROOT } from '../constants/constants'
import { LoginResponse, User } from '../utils-schema/auth.schema'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: "/sign-in?error='Ошибка входа'"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        try {
          if (!credentials) {
            return null
          }

          console.log('Credentials -->', credentials)
          const { email, password } = credentials
          const response = await fetch(
            API_ROOT + '/' + 'login.php' + `?u=${email}&p=${password}`,
            {
              cache: 'no-store'
            }
          )

          if (!response.ok) {
            throw new Error('Ошибка входа. Попробуйте еще раз чуть позже')
          }

          return await response.json()
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, jwt: { ...user } as LoginResponse }
      }

      if (token.jwt?.auth_token) {
        try {
          const fetchedUser = await getUserData(token.jwt.auth_token)
          return { ...token, user: fetchedUser }
        } catch (error) {
          console.log(error)
          const message = `Ошибка ${(error as Error).message}`
          return Promise.reject(new Error(message))
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.jwt = token.jwt
      return session
    }
  }
}

async function getUserData(token: string): Promise<User> {
  const response = await fetch(API_ROOT + '/' + 'get-user-info.php', {
    headers: {
      Authorization: `${token}`
    }
  })

  const result = (await response.json()) as User
  if (result.error && result.error !== 0) {
    throw new Error('Ошибка получения информации о пользователе.')
  }

  return result
}
