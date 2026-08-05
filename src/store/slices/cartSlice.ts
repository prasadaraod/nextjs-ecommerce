// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Load cart from localStorage if running in browser
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('devvault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Hydrate cart from localStorage on client load
    initializeCart: (state) => {
      state.items = loadCartFromStorage();
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.isOpen = true; // Auto-open cart overlay on item add
      if (typeof window !== 'undefined') {
        localStorage.setItem('devvault_cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('devvault_cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('devvault_cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('devvault_cart');
      }
    },
  },
});

export const {
  initializeCart,
  toggleCart,
  openCart,
  closeCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;