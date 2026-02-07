import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, getUserByEmail } from '@/lib/db';
import { generateToken, verifyPassword } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    const env = getRequestContext().env as any;
    const db = getDb(env.DB);

    const user = await getUserByEmail(db, email);
    if (!user) {
      return Response.json({ error: 'Wrong email or password' }, { status: 401 });
    }

    const passwordOk = verifyPassword(password, user.passwordHash);
    if (!passwordOk) {
      return Response.json({ error: 'Wrong email or password' }, { status: 401 });
    }

    const token = generateToken(user.id, user.username, env.JWT_SECRET);
    console.log('User logged in:', user);
    return Response.json({
      success: true,
      token,
      userId: user.id,
      username: user.username
    });
    
  } catch (error) {
    console.log('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}