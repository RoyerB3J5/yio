import { CartItem, Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, type: "increment" | "decrement") => void;
  clearCart: () => void;
  // Selectores computados directos
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        const cart = get().cart;
        const itemExiste = cart.find((item) => item.id === product.id);

        if (itemExiste) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: quantity }] });
        }
      },

      removeItem: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, type) => {
        const cart = get().cart;
        set({
          cart: cart
            .map((item) => {
              if (item.id === id) {
                const nuevaCantidad =
                  type === "increment" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: nuevaCantidad };
              }
              return item;
            })
            .filter((item) => item.quantity > 0), // Si baja de 1, se elimina automáticamente
        });
      },

      clearCart: () => set({ cart: [] }),

      // Helpers computados
      getTotalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().cart.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0,
        ),
    }),
    {
      name: "shopping-cart-storage", // Nombre de la llave en localStorage
      skipHydration: true, // Crucial para Next.js (lo explico abajo)
    },
  ),
);
