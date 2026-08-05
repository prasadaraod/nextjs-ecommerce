// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Demo authentication check
    if (email === 'dev@devvault.com' && password === 'password123') {
      const user = {
        id: 'usr_101',
        email: 'dev@devvault.com',
        name: 'Prasada Rao',
        role: 'buyer' as const,
      };

      const token = await signJWT({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const response = NextResponse.json({
        success: true,
        user,
        token,
      });

      // Store JWT securely in an HttpOnly cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}