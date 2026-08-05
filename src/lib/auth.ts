// src/lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { JWTPayload } from '@/lib/types';

const secretKey = process.env.JWT_SECRET || 'default_super_secret_key_change_in_production_min_32_chars';
const encodedKey = new TextEncoder().encode(secretKey);

export async function signJWT(payload: JWTPayload, expiresIn: string = '1h'): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}