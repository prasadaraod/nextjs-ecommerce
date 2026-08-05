// src/lib/types.ts

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  imageUrl: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'instructor' | 'admin';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}