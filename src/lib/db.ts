import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { users } from '../../schema';

// Connect to D1 database
export function getDb(d1: any) {
  return drizzle(d1, { schema: { users } });
}

// Find user by username
export async function getUserByUsername(db: any, username: string) {
  const result = await db.select().from(users).where(eq(users.username, username));
  return result[0] || null;
}

// Find user by email
export async function getUserByEmail(db: any, email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
}

// Add new user to database
export async function createUser(db: any, username: string, email: string, passwordHash: string) {
  const result = await db.insert(users).values({
    username,
    email,
    passwordHash,
  }).returning();
  return result[0];
}
