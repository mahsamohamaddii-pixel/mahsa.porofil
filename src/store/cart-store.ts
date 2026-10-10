"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  slug: string;
  nameFa: string;
  price: number;
  image: string | null;
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
};

function sameLine(a: CartItem, productId: number, size: string, color: string) {
  return a.productId === productId && a.size === size && a.color === color;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => sameLine(i, item.productId, item.size, item.color));
        if (existing) {
          set({
            items: items.map((i) =>
              sameLine(i, item.productId, item.size, item.color)
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, { ...item, quantity }], isOpen: true });
        }
      },
      removeItem: (productId, size, color) => {
        set({ items: get().items.filter((i) => !sameLine(i, productId, size, color)) });
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => !sameLine(i, productId, size, color)) });
          return;
        }
        set({
          items: get().items.map((i) =>
            sameLine(i, productId, size, color) ? { ...i, quantity } : i,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "mahra-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}

export function useCartTotal() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
}
