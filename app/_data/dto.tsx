// DTO - Data Transfer Object

import 'server-only'

import { getUserByEmail } from './dal';

/**
 * Used to filter the user data so sensitive information
 * would not accidentally be passed to the client
 * 
 * @param email 
 * @returns UserDto
 */
export async function getUserDtoByEmail(email: string | undefined) {
  
  const userData = await getUserByEmail(email)

  return {
    name: userData.name,
    email: userData.email,
    image: userData.image
  };
}