import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { users, type User, type NewUser } from '../../schema';

export function getDb(d1: any) {
  return drizzle(d1, { schema: { users } });
}

export async function getUserByUsername(
  db: any,
  username: string
): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.username, username));
  return result.length > 0 ? result[0] : null;
}

export async function getUserByEmail(
  db: any,
  email: string
): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result.length > 0 ? result[0] : null;
}

export async function createUser(
  db: any,
  data: Omit<NewUser, 'createdAt'>
): Promise<User> {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}
