// src/components/ui/ProductCard.tsx
'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <div className="group flex flex-col justify-between rounded-xl border bg-card p-4 transition-all hover:shadow-md">
      <div>
        <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span className="font-semibold text-primary">{product.category}</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
          </span>
        </div>
        <Link href={`/courses/${product.id}`}>
          <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
      </div>

      <div className="flex items-center justify-between border-t pt-3 mt-auto">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}