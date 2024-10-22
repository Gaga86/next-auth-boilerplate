"use client"

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/_actions/auth'
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { cn } from "@/app/_lib/utils"
import Link from "next/link"

export function LoginForm() {
  const [state, action] = useFormState(login, undefined)

  return (
    <form className="mt-8 space-y-6" action={action}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email">Email address</label>
          <Input id="email" name="email" type="email" placeholder="john@example.com"
            className={cn(
              "mt-1 block w-full",
              state?.errors?.email && "border-2 border-rose-600"
            )}
          />
        </div>
        {
          state?.errors?.email &&
          <p className='text-rose-600 dark:text-rose-500 text-sm'>
            {state.errors.email}
          </p>
        }
        <div>
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" placeholder="••••••••"
            className={cn(
              "mt-1 block w-full",
              state?.errors?.password && "border-2 border-rose-600"
            )}
          />
        </div>
        {
          state?.errors?.password &&
          <p className='text-rose-600 dark:text-rose-500 text-sm'>
            {state.errors.password}
          </p>
        }
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div> */}

      <div>
        <SubmitButton />
      </div>

      <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button disabled={pending} type="submit" className="w-full">
      Sign in
    </Button>
  )
}