import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { NextFetchEvent, NextRequest } from 'next/server'
import { routing } from './libs/service/i18n/routing'

const publicPages = ['/', '/sign-in']

const handleI18nRouting = createMiddleware(routing)

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token && !token.expired)
    },
    pages: {
      signIn: '/sign-in'
    }
  }
)

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return handleI18nRouting(req)
  } else {
    return authMiddleware(req as NextRequestWithAuth, event)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
