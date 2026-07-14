"use client";
import { useCart } from "@/hooks/useCart";
import { Handbag } from "lucide-react";
import Image from "next/image";
interface CartIconHeaderProps {
  differentStyles?: boolean;
}
export default function CartIconHeader({
  differentStyles,
}: CartIconHeaderProps) {
  const cartStore = useCart(); // <--- Consumimos el hook seguro

  const totalItems = cartStore ? cartStore.getTotalItems() : 0;
  const openCart = cartStore ? cartStore.openCart : () => {};

  return (
    <button
      onClick={openCart}
      className="w-10.5 h-10.5 flex justify-center items-center cursor-pointer relative"
    >
      <Handbag
        className={`w-5 md:w-4 h-auto block ${differentStyles ? "text-white" : "text-primary"}`}
      />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
