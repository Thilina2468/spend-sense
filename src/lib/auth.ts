import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

// Hash password before storing
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

// Check if password matches hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

// Create simple token
export function generateToken(userId: number, username: string, secret: string): string {
  const data = `${userId}-${username}-${Date.now()}`;
  const token = crypto.createHmac('sha256', secret).update(data).digest('hex');
  return token;
}
