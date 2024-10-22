import bcrypt from "bcryptjs"

/**
 * Method for salting and hashing passwords
 * @param password 
 * @returns hashed password
 */
export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * Method for comparing password and hash
 * @param password 
 * @param hash 
 * @returns Boolean
 */
export function comparePassword(password: string | undefined, hash: string | undefined) {
  if ( !password || !hash ) return false
  return bcrypt.compareSync(password, hash)
}