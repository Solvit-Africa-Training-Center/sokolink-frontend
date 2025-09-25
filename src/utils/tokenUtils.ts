// src/utils/tokenUtils.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  jti: string;
}

export const decodeToken = (token: string): DecodedToken => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log('✅ Token decoded successfully');
    return decoded;
  } catch (error) {
    console.error('❌ Token decoding failed:', error);
    throw new Error('Invalid token');
  }
};