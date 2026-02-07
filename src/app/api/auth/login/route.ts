import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, getUserByEmail } from '@/lib/db';
import { generateToken, verifyPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Get database
    const env = getRequestContext().env as any;
    const db = getDb(env.DB);

    // Find user by email
    const user = await getUserByEmail(db, email);
    if (!user) {
      return Response.json({ error: 'Wrong email or password' }, { status: 401 });
    }

    // Check password
    const passwordOk = await verifyPassword(password, user.passwordHash);
    if (!passwordOk) {
      return Response.json({ error: 'Wrong email or password' }, { status: 401 });
    }

    // Create token
    const token = generateToken(user.id, user.username, env.JWT_SECRET);

    // Return success
    return Response.json({
      success: true,
      token,
      userId: user.id,
      username: user.username
    });
  } catch (error) {
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}