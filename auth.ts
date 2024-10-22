import NextAuth from "next-auth"
import "next-auth/jwt"
import { getUserDtoByEmail } from '@/app/_data/dto'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/_lib/client"

import Apple from "next-auth/providers/apple"
// import Auth0 from "next-auth/providers/auth0"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"
import MailRu from "next-auth/providers/mailru"
// import Passkey from "next-auth/providers/passkey"
import TikTok from "next-auth/providers/tiktok"
import Twitter from "next-auth/providers/twitter"
import Instagram from "next-auth/providers/instagram"
import Vk from "next-auth/providers/vk"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Apple,
    // Auth0,
    Facebook,
    GitHub,
    Google,
    LinkedIn,
    MailRu,
    // Passkey({
    //   formFields: {
    //     email: {
    //       label: "Username",
    //       required: true,
    //       autocomplete: "username webauthn",
    //     },
    //   },
    // }),
    TikTok,
    Twitter,
    Instagram,
    Vk,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   email: { label: 'Email', type: 'text'},
      //   password: { label: 'Password', type: 'password'},
      //   callbaclUrl: {label: 'callback', type: 'text'},
      // },
      /**
       * This is the function that's being called after calling "signIn"
       * (method exported from this file) inside the login and register server actions.
       * It's used to log in an existing user.
       * 
       * @param credentials 
       * @returns User | CredentialsSignin | null
       */
      authorize: async (credentials: Partial<Record<"email", string>>) => {
        // console.log("credentials: ", credentials)
        /**
         * No need for validation here since it passed
         * through login and signup server actions
         */
        const { email } = credentials

        // Fetches the user and returns the data with DAL and DTO
        const user = await getUserDtoByEmail(email)
         
        return user;
      },
    }),
  ],
  /**
   * Specify URLs to be used if you want to create custom sign in, sign out and error pages.
   * Pages specified will override the corresponding built-in page.
   *
   * @default {}
   * @example
   *
   * ```ts
   *   pages: {
   *     signIn: '/auth/signin',
   *     signOut: '/auth/signout',
   *     error: '/auth/error',
   *     verifyRequest: '/auth/verify-request',
   *     newUser: '/auth/new-user'
   *   }
   * ```
   */
  pages: {
    signIn: "/login",
  },
  /**
   * Choose how you want to save the user session.
   * The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
   *
   * If you use an `adapter` however, we default it to `"database"` instead.
   * You can still force a JWT session by explicitly defining `"jwt"`.
   *
   * When using `"database"`, the session cookie will only contain a `sessionToken` value,
   * which is used to look up the session in the database.
   *
   * [Documentation](https://authjs.dev/reference/core#authconfig#session) | [Adapter](https://authjs.dev/reference/core#authconfig#adapter) | [About JSON Web Tokens](https://authjs.dev/concepts/session-strategies#jwt-session)
   */
  session: {
    strategy: "jwt"
  },
  /**
   * Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   * Callbacks are *extremely powerful*, especially in scenarios involving JSON Web Tokens
   * as they **allow you to implement access controls without a database** and to **integrate with external databases or APIs**.
   */
  callbacks: {
    /**
     * Invoked when a user needs authorization, using [Middleware](https://nextjs.org/docs/advanced-features/middleware).
     *
     * You can override this behavior by returning a {@link NextResponse}.
     *
     * @example
     * ```ts title="app/auth.ts"
     * async authorized({ request, auth }) {
     *   const url = request.nextUrl
     *
     *   if(request.method === "POST") {
     *     const { authToken } = (await request.json()) ?? {}
     *     // If the request has a valid auth token, it is authorized
     *     const valid = await validateAuthToken(authToken)
     *     if(valid) return true
     *     return NextResponse.json("Invalid auth token", { status: 401 })
     *   }
     *
     *   // Logged in users are authenticated, otherwise redirect to login page
     *   return !!auth.user
     * }
     * ```
     *
     * :::warning
     * If you are returning a redirect response, make sure that the page you are redirecting to is not protected by this callback,
     * otherwise you could end up in an infinite redirect loop.
     * :::
     */
    authorized({ request, auth }) {
      // console.log("auth.ts: authorized: ", request, auth)
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    /**
     * This callback is called whenever a JSON Web Token is created (i.e. at sign in)
     * or updated (i.e whenever a session is accessed in the client). Anything you
     * return here will be saved in the JWT and forwarded to the session callback.
     * There you can control what should be returned to the client. Anything else
     * will be kept from your frontend. The JWT is encrypted by default via your
     * AUTH_SECRET environment variable.
     *
     * [`session` callback](https://authjs.dev/reference/core/types#session)
     */
    // jwt({ token, trigger, session, account }) {
    //   // console.log("auth.ts: jwt: ", token, trigger, session, account)
    //   if (trigger === "update") token.name = session.user.name
    //   if (account?.provider === "keycloak") {
    //     return { ...token, accessToken: account.access_token }
    //   }
    //   return token
    // },
    /**
     * This callback is called whenever a session is checked.
     * (i.e. when invoking the `/api/session` endpoint, using `useSession` or `getSession`).
     * The return value will be exposed to the client, so be careful what you return here!
     * If you want to make anything available to the client which you've added to the token
     * through the JWT callback, you have to explicitly return it here as well.
     *
     * :::note
     * ⚠ By default, only a subset (email, name, image)
     * of the token is returned for increased security.
     * :::
     *
     * The token argument is only available when using the jwt session strategy, and the
     * user argument is only available when using the database session strategy.
     *
     * [`jwt` callback](https://authjs.dev/reference/core/types#jwt)
     *
     * @example
     * ```ts
     * callbacks: {
     *   async session({ session, token, user }) {
     *     // Send properties to the client, like an access_token from a provider.
     *     session.accessToken = token.accessToken
     *
     *     return session
     *   }
     * }
     * ```
     */
    // async session({ session, token }) {
    //   // console.log("auth.ts: session: ", session, token)
    //   if (token?.accessToken) {
    //     session.accessToken = token.accessToken
    //   }
    //   return session
    // },
  },
  // experimental: {
  //   enableWebAuthn: true,
  // },
  // debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
