import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, getUserByUsername, getUserByEmail, createUser } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get Cloudflare environment
    const env = getRequestContext().env as any;
    const db = getDb(env.DB);
    const jwtSecret = env.JWT_SECRET;

    // Check if username already exists
    const existingUser = await getUserByUsername(db, username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await getUserByEmail(db, email);
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = await createUser(db, {
      username,
      email,
      passwordHash,
    });

    // Generate JWT token
    const token = await generateToken(
      { userId: newUser.id, username: newUser.username },
      jwtSecret
    );

    console.log('Registration successful for user:', newUser.id, newUser.email);

    // Return success with token
    return NextResponse.json(
      {
        success: true,
        token,
        userId: newUser.id,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
