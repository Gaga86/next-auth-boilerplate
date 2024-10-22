// DAL - Data Access Layer

import 'server-only'

// import { cache } from 'react'
// import { auth } from "@/auth"
import prisma from '@/app/_lib/client'
import { hashPassword, comparePassword } from '@/app/_lib/encryption'

// export const getSession = cache( async () => {
//   const session = await auth()
//   console.log('getSession session', session)
//   return session
// });

/**
 * Returns whole user object if found or null
 * 
 * @param email 
 * @returns User | null
 */
export async function getUserByEmail(email: string | undefined) {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

/**
 * Checks whether the user with a perticular email exists in the DB
 * 
 * @param email
 * @returns Boolean
 */
export async function userWithEmailExists(email: string) {
  const count = await prisma.user.count({
    where: {
      email: email
    }
  })
  return Boolean(count)
}

/**
 * Creates new user in the database using credentials method
 * 
 * @param name 
 * @param email 
 * @param password 
 */
export async function createUserWithCredentials(name: string, email: string, password: string) {
  // Hash the user's password before storing it
  const hashedPassword = await hashPassword(password)
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })
}

/**
 * Checks whether the user exists and compares passwords or throws errors in any case
 */
export async function verifyUserCredentials(email: string, password: string) {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      password: true
    },
  })

  // Verify password from the request with the stored password from the DB
  if (!comparePassword(password, userData.password)) {
    throw new Error('Passwords do not match')
  }
}