import { z } from 'zod'

// Zod schema used for registration with credentials form
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

// Zod schema user for login with credentials form
export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
})

// Form state type definition for credentials authentication
export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined

// export type SessionPayload =
//   | {
//     sessionId: string,
//     expiresAt: Date
//   }
//   | undefined

// export type User = {
//   id: string,
//   name: string,
//   email: string,
//   emailVerified: Date,
//   image: string,
//   session: Session,
// }

// export type Session = {
//   userId: string,
//   expiresAt: Date
// }

// Error schema for the 
export const authError = {
  email: ["Wrong username or password"],
  password: []
}