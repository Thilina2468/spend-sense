import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, getUserByUsername, getUserByEmail, createUser } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Validate inputs
    if (!username || !email || !password) {
      return Response.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    // Check password length
    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Check email format (simple check)
    if (!email.includes('@')) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Get database
    const env = getRequestContext().env as any;
    const db = getDb(env.DB);

    // Check if username already exists
    const existingUsername = await getUserByUsername(db, username);
    if (existingUsername) {
      return Response.json({ error: 'Username already taken' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await getUserByEmail(db, email);
    if (existingEmail) {
      return Response.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await createUser(db, username, email, hashedPassword);

    // Create token
    const token = generateToken(newUser.id, newUser.username, env.JWT_SECRET);

    // Return success
    return Response.json({
      success: true,
      token,
      userId: newUser.id,
      username: newUser.username
    }, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}
