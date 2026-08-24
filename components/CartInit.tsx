"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export function CartInit() {
  const initCart = useCartStore((state) => state.initCart);

  useEffect(() => {
    initCart();
  }, [initCart]);

  return null;
}