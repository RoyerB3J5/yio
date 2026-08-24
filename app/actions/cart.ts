"use server";

import { cookies } from "next/headers";
import {
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart,
  type Cart,
} from "@/lib/shopify";

const CART_COOKIE = "cartId";

export async function getCartAction(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;

  const cart = await getCart(cartId);

  if (!cart) {
    cookieStore.delete(CART_COOKIE);
    return null;
  }

  return cart;
}

export async function addToCartAction(variantId: string, quantity = 1): Promise<Cart> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    const cart = await createCart([{ merchandiseId: variantId, quantity }]);
    console.log("createCart response:", JSON.stringify(cart, null, 2));
    if (!cart.lines.edges.length) {
      throw new Error(`Variant ${variantId} not added to cart. Lines: ${JSON.stringify(cart.lines)}`);
    }
    cookieStore.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    return cart;
  }

  const cart = await addCartLines(cartId, [{ merchandiseId: variantId, quantity }]);
  console.log("addCartLines response:", JSON.stringify(cart, null, 2));
  if (!cart.lines.edges.length) {
    throw new Error(`Variant ${variantId} not added to cart. Lines: ${JSON.stringify(cart.lines)}`);
  }
  return cart;
}

export async function updateCartLineAction(lineId: string, quantity: number): Promise<Cart> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No hay carrito activo");

  const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
  return cart;
}

export async function removeCartLineAction(lineId: string): Promise<Cart> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No hay carrito activo");

  const cart = await removeCartLines(cartId, [lineId]);
  return cart;
}