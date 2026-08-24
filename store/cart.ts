"use client";

import { create } from "zustand";
import {
  getCartAction,
  addToCartAction,
  updateCartLineAction,
  removeCartLineAction,
} from "@/app/actions/cart";

type CartLineMerchandise = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  image: { url: string; altText: string | null } | null;
  price: { amount: string; currencyCode: string };
  product: { title: string; handle: string; tags: string[]; productType: string };
};

type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  merchandise: CartLineMerchandise;
};

type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: Array<{ node: CartLine }> };
};

type CartStore = {
  cart: Cart | null;
  isLoading: boolean;
  isDrawerOpen: boolean;

  openDrawer: () => void;
  closeDrawer: () => void;

  initCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  isLoading: false,
  isDrawerOpen: false,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  initCart: async () => {
    const cart = await getCartAction();
    set({ cart });
  },

  addItem: async (variantId, quantity = 1) => {
    set({ isLoading: true });
    try {
      const cart = await addToCartAction(variantId, quantity);
      set({ cart, isDrawerOpen: true });
    } finally {
      set({ isLoading: false });
    }
  },

  updateItem: async (lineId, quantity) => {
    set({ isLoading: true });
    try {
      const cart = await updateCartLineAction(lineId, quantity);
      set({ cart });
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (lineId) => {
    set({ isLoading: true });
    try {
      const cart = await removeCartLineAction(lineId);
      set({ cart });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export type { Cart, CartLine };