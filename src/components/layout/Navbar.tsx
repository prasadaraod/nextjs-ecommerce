// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, Code2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/slices/cartSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Code2 className="h-6 w-6" />
          <span>DevVault</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/explore" className="transition hover:text-primary">Explore</Link>
          <Link href="/about" className="transition hover:text-primary">About</Link>
          <Link href="/faq" className="transition hover:text-primary">FAQ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 rounded-full hover:bg-muted transition"
            aria-label="Open Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalQuantity}
              </span>
            )}
          </button>
          <Link href="/dashboard" className="p-2 rounded-full hover:bg-muted transition">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}