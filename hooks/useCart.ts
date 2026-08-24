"use client";
import { useCartStore } from "@/store/cart";

export function useCart() {
  const cart = useCartStore((state) => state.cart);
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const closeCart = useCartStore((state) => state.closeDrawer);
  const isLoading = useCartStore((state) => state.isLoading);
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;

  const getTotalPrice = () => {
    return lines.reduce(
      (acc, line) => acc + Number(line.merchandise.price.amount) * line.quantity,
      0
    );
  };

  const getTotalItems = () => totalQuantity;

  return {
    cart: lines,
    isOpen,
    closeCart,
    isLoading,
    addItem,
    updateQuantity: (lineId: string, type: "increment" | "decrement") => {
      const line = lines.find((l) => l.id === lineId);
      if (!line) return;
      const newQuantity = type === "increment" ? line.quantity + 1 : line.quantity - 1;
      updateItem(lineId, Math.max(0, newQuantity));
    },
    removeItem,
    getTotalPrice,
    getTotalItems,
    totalQuantity,
    openCart: openDrawer,
  };
}
