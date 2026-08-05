// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [completed, setCompleted] = useState(false);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const handleCompleteOrder = () => {
    dispatch(clearCart());
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-primary">Order Confirmed!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Thank you for your purchase, {user?.name || 'Developer'}. Your digital course accesses have been activated in your dashboard.
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground text-sm hover:opacity-90 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link href="/explore" className="text-sm font-semibold text-primary underline">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
              <div className="divide-y text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold text-lg">Total</h3>
              <div className="flex justify-between font-bold text-xl border-t pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCompleteOrder}
                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground text-sm hover:opacity-90 transition"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}