export function verifyPassword(password: string, stored: string): boolean {
  return password === stored;
}

export function generateToken(userId: number, username: string, secret: string): string {
  return `${userId}-${username}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
