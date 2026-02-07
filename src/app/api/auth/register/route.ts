import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, getUserByUsername, getUserByEmail, createUser } from '@/lib/db';
import { generateToken } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return Response.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const env = getRequestContext().env as any;
    const db = getDb(env.DB);

    const existingUsername = await getUserByUsername(db, username);
    if (existingUsername) {
      return Response.json({ error: 'Username already taken' }, { status: 400 });
    }

    const existingEmail = await getUserByEmail(db, email);
    if (existingEmail) {
      return Response.json({ error: 'Email already registered' }, { status: 400 });
    }

    const newUser = await createUser(db, username, email, password);
    const token = generateToken(newUser.id, newUser.username, env.JWT_SECRET);

    return Response.json({
      success: true,
      token,
      userId: newUser.id,
      username: newUser.username
    }, { status: 201 });
  } catch (error) {
    console.log('Registration error:', error);
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}
