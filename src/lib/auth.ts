import bcryptjs from 'bcryptjs';
import * as jose from 'jose';

const BCRYPT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export async function generateToken(
  payload: { userId: number; username: string },
  secret: string
): Promise<string> {
  const secretKey = new TextEncoder().encode(secret);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);
  return token;
}

export async function verifyToken(
  token: string,
  secret: string
): Promise<{ userId: number; username: string } | null> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    const verified = await jose.jwtVerify(token, secretKey);
    return verified.payload as { userId: number; username: string };
  } catch (error) {
    return null;
  }
}
