import { withAuth } from 'next-auth/middleware'
import { parse } from 'date-fns'
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token?.jwt?.auth_token) {
        const expirationDate = parse(
          token.jwt.token_exp_time,
          'dd.MM.yyyy HH:mm:ss',
          new Date()
        )
        return expirationDate.getTime() > Date.now()
      }

      return false
    }
  },
  pages: {
    signIn: '/sign-in',
    error: "/sign-in?error='Ошибка входа'"
  }
})

export const config = {
  matcher: ['/showcase', '/showcase/:path*']
}
