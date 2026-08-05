// src/components/layout/CartDrawer.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeCart,
  initializeCart,
  removeFromCart,
  updateQuantity,
} from '@/store/slices/cartSlice';

export default function CartDrawer() {
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="flex h-full w-full max-w-md flex-col bg-background p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="rounded-full p-1 hover:bg-muted transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3 bg-card"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.product.title}</h4>
                  <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="rounded border p-1 hover:bg-muted"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="rounded border p-1 hover:bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-muted-foreground hover:text-destructive transition p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => dispatch(closeCart())}
              className="block w-full text-center rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}