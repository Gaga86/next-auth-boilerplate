"use server"

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/_lib/definitions'
import { redirect } from 'next/navigation'
import { signIn, signOut } from '@/auth'
import { authError } from '@/app/_lib/definitions'
import { createUserWithCredentials, userWithEmailExists, verifyUserCredentials } from '@/app/_data/dal'

/**
 * Method that executes 'authorize' function in
 * Credentials provider defined under auth.ts file
 * by specifying "credentials" provider as first
 * parameter of the signIn function imported from '@/auth'
 * 
 * @param email
 * @returns redirectUrl
 */
async function authWithEmail(email: string) {
  
  try {
    const redirectUrl = await signIn("credentials", {
      redirectTo: '/',
      redirect: false,
      email,
    });

    return redirectUrl
    
  } catch (error) {
    console.error('authWithEmail error', error)
    // consider using redirection to custom error page with query parameters
    throw new Error('Something went wrong!')
  }
}

/**
 * Handles user registration with credentials
 * 
 * @param state 
 * @param formData 
 * @returns redirect
 */
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for further tests and insertion into database
  const { name, email, password } = validatedFields.data

  // Check if the username was already registered
  const douplicateEmail = await userWithEmailExists(email)

  if (douplicateEmail) {
    return {
      errors: {
        name: ["It seams your accounts already exists, try signing in instead."],
        email: [],
        password: []
      },
    }
  }

  try {
    // Insert the user into the database
    await createUserWithCredentials(name, email, password)

  } catch (error) {
    console.error('Error occurred while creating the user with credentials', error)
    return {
      errors: {
        name: ["An error occured during registration, please contact our support"],
        email: [],
        password: []
      },
    }
  }

  // Login procedure
  const redirectUrl = await authWithEmail(email);
  redirect(redirectUrl)
}

/**
 * Handles user login with credentials
 * 
 * @param state 
 * @param formData 
 * @returns 
 */
export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Extract the validated fields
  const { email, password } = validatedFields.data
  
  /**
   * To verify a successfull login, the following conditions need to be met:
   * 1. The user with associated email must exist in the DB
   * 2. Inserted password must match the password from the DB
   * 
   * In any of the conditions in not met, the method "verifyUserCredentials"
   * throws errors, and if this block catches them,
   * we return the generic "authError" object from definitions.tsx
   */
  try {
    
    await verifyUserCredentials(email, password)

  } catch (error) {
    console.error('error fetching user from db', error)
    return {
      errors: authError,
    }
  }

  // If the user passes verification, go to login procedure
  const redirectUrl = await authWithEmail(email);

  redirect(redirectUrl)
}

/**
 * Signout server action 
 * @returns signout()
 */
export async function logout() {
  return signOut()
}