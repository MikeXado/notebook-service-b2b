import type { User, LoginResponse } from './libs/utils-schema/auth.schema'

declare module 'next-auth' {
  interface Session {
    user: User
    jwt: LoginResponse
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    jwt: LoginResponse
  }
}
