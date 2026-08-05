// src/components/ui/AddToCartButton.tsx
'use client';

import { Product } from '@/lib/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
    >
      <ShoppingCart className="h-4 w-4" /> Add to Cart
    </button>
  );
}