import { env } from '@/env'
import { jwtVerify } from 'jose'

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(
        env.JWT_SECRET,
      ),
      { algorithms: ['HS256'] },
    )
    return true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}