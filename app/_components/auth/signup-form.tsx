
"use client"

import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/_actions/auth'
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { cn } from "@/app/_lib/utils"

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <form className="mt-8 space-y-6" action={action}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="name">Full Name</label>
          <Input id="name" name="name" type="text" placeholder="John Doe"
            className={cn(
              "mt-1 block w-full",
              state?.errors?.name && "border-2 border-rose-600"
            )}
          />
        </div>
        {
          state?.errors?.name &&
          <p className='text-rose-600 dark:text-rose-500 text-sm'>
            {state.errors.name}
          </p>
        }
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
          (
            <div className='text-rose-600 dark:text-rose-500 text-sm'>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} variant="outline" type="submit" className="w-full">
      Register
    </Button>
  )
}