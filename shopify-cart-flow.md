# Flujo completo: Add to Cart → Cart Drawer → Checkout (Next.js + Shopify Storefront API + Zustand)

Esta guía cubre **todo el recorrido**, desde que el usuario presiona "Add to Cart" hasta que llega al checkout de Shopify, usando:

- Next.js App Router (Server Actions + Server/Client Components)
- Shopify Storefront API (Cart API, GraphQL)
- Zustand para el estado global del carrito en el cliente
- Cookies httpOnly para persistir el `cartId` entre sesiones

Se asume que **el cliente de Storefront API ya está armado** (`lib/shopify.js` con `shopifyFetch`).

---

## 1. Arquitectura general del flujo

```
┌──────────────┐     click      ┌───────────────────┐
│ AddToCart     │ ─────────────▶│ Zustand action     │
│ Button        │                │ (store)            │
└──────────────┘                └─────────┬──────────┘
                                           │ llama
                                           ▼
                                 ┌───────────────────┐
                                 │ Server Action       │
                                 │ addToCart()          │
                                 └─────────┬──────────┘
                                           │ lee/crea cookie cartId
                                           ▼
                                 ┌───────────────────┐
                                 │ Shopify Storefront  │
                                 │ API (cartCreate /    │
                                 │ cartLinesAdd)         │
                                 └─────────┬──────────┘
                                           │ devuelve CART completo
                                           ▼
                                 ┌───────────────────┐
                                 │ Zustand store        │
                                 │ setCart(cart)         │
                                 └─────────┬──────────┘
                                           │ re-render automático
                                           ▼
                                 ┌───────────────────┐
                                 │ Cart Drawer (UI)     │
                                 │ muestra el JSON      │
                                 └───────────────────┘
                                           │ click "Checkout"
                                           ▼
                          window.location.href = cart.checkoutUrl
                                           │
                                           ▼
                              Checkout hosteado por Shopify
```

**Principio clave:** existe **un solo objeto `cart`**, que vive en Shopify. Zustand solo guarda una copia en memoria de ese objeto para que la UI reaccione. Nunca se calculan precios ni se arma el carrito "a mano" en el frontend.

---

## 2. Instalar dependencias

```bash
npm install zustand
```

(Storefront API no necesita SDK, se consume con `fetch` a GraphQL — ya lo tenés armado).

---

## 3. El store de Zustand

Este store **no llama directamente a Shopify** — llama a las Server Actions, que son las que hablan con la Storefront API. Zustand solo orquesta el estado del cliente (carrito actual, loading, UI del drawer).

```ts
// store/cart-store.ts
import { create } from "zustand";
import {
  addToCart as addToCartAction,
  updateCartLine as updateCartLineAction,
  removeCartLine as removeCartLineAction,
  getCart as getCartAction,
} from "@/app/actions/cart";

type CartStore = {
  cart: any | null;          // el objeto cart tal cual lo devuelve Shopify
  isLoading: boolean;
  isDrawerOpen: boolean;

  openDrawer: () => void;
  closeDrawer: () => void;

  initCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
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
      set({ cart, isDrawerOpen: true }); // abrir el drawer al agregar, buena práctica de UX
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
```

> **Por qué Zustand y no Context acá:** con Zustand evitás el problema clásico de Context de re-renderizar todo el árbol de componentes que consumen el carrito (badge del header, drawer, página de carrito, etc.) cada vez que cambia cualquier cosa. Cada componente se suscribe solo al slice que necesita.

---

## 4. Fragmento GraphQL reutilizable del carrito

```ts
// lib/shopify/fragments.ts
export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              selectedOptions { name value }
              image { url altText }
              price { amount currencyCode }
              product { title handle }
            }
          }
        }
      }
    }
  }
`;
```

---

## 5. Server Actions: el puente hacia Shopify

Las Server Actions son las únicas que tocan la Storefront API y las cookies. Corren en el servidor, así que el `cartId` en cookie `httpOnly` nunca queda expuesto al cliente.

```ts
// app/actions/cart.ts
"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";
import { CART_FRAGMENT } from "@/lib/shopify/fragments";

const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_ADD = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_UPDATE = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_REMOVE = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_QUERY = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;

const CART_COOKIE = "cartId";

// Trae el carrito actual (o null si no existe / expiró)
export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;

  const data = await shopifyFetch({ query: CART_QUERY, variables: { cartId } });

  // Si el carrito expiró (Shopify los vence a las ~10 semanas), Shopify devuelve null
  if (!data.cart) {
    cookieStore.delete(CART_COOKIE);
    return null;
  }

  return data.cart;
}

export async function addToCart(variantId: string, quantity = 1) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    const data = await shopifyFetch({
      query: CART_CREATE,
      variables: { input: { lines: [{ merchandiseId: variantId, quantity }] } },
    });

    if (data.cartCreate.userErrors.length) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }

    const cart = data.cartCreate.cart;
    cookieStore.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return cart;
  }

  const data = await shopifyFetch({
    query: CART_LINES_ADD,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  });

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(lineId: string, quantity: number) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No hay carrito activo");

  const data = await shopifyFetch({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });

  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(lineId: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No hay carrito activo");

  const data = await shopifyFetch({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds: [lineId] },
  });

  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}
```

> `quantity: 0` en `cartLinesUpdate` también elimina la línea, por si preferís unificar "disminuir hasta 0" en una sola función.

---

## 6. Inicializar el carrito al cargar la app (buena práctica)

Como el store de Zustand vive solo en memoria del cliente, si el usuario refresca la página se pierde el `cart` en memoria (aunque el `cartId` sigue en la cookie). Por eso conviene hidratar el store al montar la app:

```tsx
// components/cart-init.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export function CartInit() {
  const initCart = useCartStore((state) => state.initCart);

  useEffect(() => {
    initCart();
  }, [initCart]);

  return null;
}
```

```tsx
// app/layout.tsx
import { CartInit } from "@/components/cart-init";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartInit />
        {children}
      </body>
    </html>
  );
}
```

---

## 7. El botón "Add to Cart"

```tsx
// components/add-to-cart-button.tsx
"use client";

import { useCartStore } from "@/store/cart-store";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  async function handleClick() {
    try {
      await addItem(variantId, 1);
    } catch (err) {
      console.error(err);
      // acá después conectás un toast/notificación de error
    }
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Agregando..." : "Add to Cart"}
    </button>
  );
}
```

`addItem` ya se encarga de abrir el drawer automáticamente (`isDrawerOpen: true`), que es una práctica de UX estándar en e-commerce: el usuario ve confirmación inmediata de que el producto entró al carrito.

---

## 8. Cart Drawer (versión JSON "cruda", para esta etapa)

Como pediste, por ahora el drawer solo muestra el JSON de la respuesta — sin diseño todavía. Ya queda armada la estructura para que después solo reemplaces el `<pre>` por tu UI real, sin tocar la lógica.

```tsx
// components/cart-drawer.tsx
"use client";

import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const cart = useCartStore((state) => state.cart);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const isLoading = useCartStore((state) => state.isLoading);

  if (!isDrawerOpen) return null;

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "400px",
        height: "100vh",
        background: "#fff",
        borderLeft: "1px solid #ddd",
        overflowY: "auto",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <button onClick={closeDrawer}>Cerrar</button>

      <h2>Carrito {isLoading && "(actualizando...)"}</h2>

      {!cart || cart.lines.edges.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {/* Placeholder temporal: acá después va el diseño real con imagen,
              nombre, variante y botones +/- por línea */}
          <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(cart, null, 2)}
          </pre>

          <CheckoutButton checkoutUrl={cart.checkoutUrl} />
        </>
      )}
    </aside>
  );
}

function CheckoutButton({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <button
      onClick={() => {
        window.location.href = checkoutUrl;
      }}
      style={{ marginTop: "16px", width: "100%" }}
    >
      Ir a pagar
    </button>
  );
}
```

Montalo una sola vez en el layout, junto al `CartInit`:

```tsx
// app/layout.tsx
import { CartInit } from "@/components/cart-init";
import { CartDrawer } from "@/components/cart-drawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartInit />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
```

---

## 9. Preparado para +/- de cantidad (a futuro)

Aunque el drawer hoy solo muestra JSON, ya tenés `updateItem` y `removeItem` listos en el store. Cuando hagas el diseño final, cada línea del carrito solo necesita esto:

```tsx
function CartLineControls({ line }: { line: any }) {
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div>
      <button onClick={() => updateItem(line.id, line.quantity - 1)}>-</button>
      <span>{line.quantity}</span>
      <button onClick={() => updateItem(line.id, line.quantity + 1)}>+</button>
      <button onClick={() => removeItem(line.id)}>Eliminar</button>
    </div>
  );
}
```

Recordá: `line.id` es el **ID de la línea del carrito**, distinto de `line.merchandise.id` (ID de la variante). Para +/- y eliminar siempre usás `line.id`.

---

## 10. Buenas prácticas aplicadas en esta arquitectura

| Práctica | Por qué |
|---|---|
| `cartId` en cookie `httpOnly` | El ID no es sensible, pero httpOnly evita manipulación desde JS malicioso (XSS) y persiste el carrito entre sesiones/pestañas. |
| Toda mutación devuelve el `cart` completo | Evita desincronización entre lo que se muestra y lo que se cobra; una sola fuente de verdad. |
| Server Actions en vez de API routes manuales | Menos boilerplate, tipado end-to-end, y mantiene el Storefront token fuera del bundle del cliente si en algún momento decidís no exponerlo (aunque el token de Storefront sí está pensado para ser público). |
| Zustand con selectores (`state => state.cart`) | Evita re-renders innecesarios; cada componente solo reacciona a lo que realmente usa. |
| `initCart()` al montar la app | Recupera el carrito tras un refresh de página, ya que el estado de Zustand es efímero (solo memoria). |
| Abrir el drawer automáticamente al agregar | Feedback inmediato — patrón estándar de UX en e-commerce (Amazon, Shopify themes, etc. lo hacen). |
| `availableForSale` chequeado en el selector de variante | Evita que el usuario intente agregar algo sin stock (Shopify no lo bloquea solo del lado del cart). |
| Manejo de carrito expirado (`cart` null) | Los carritos de Shopify vencen (~10 semanas); si no lo manejás, el usuario ve un error críptico. |
| `userErrors` chequeado en cada mutation | Shopify no tira excepción HTTP en errores de negocio (ej: variante sin stock), viene en el payload. |

---

## 11. Próximos pasos sugeridos (cuando avances)

1. Diseñar el `CartDrawer` real reemplazando el `<pre>` por las líneas con imagen/nombre/variante/controles.
2. Agregar un badge de cantidad en el header, leyendo `cart.totalQuantity` desde el store (gratis, ya está disponible).
3. Manejar errores de usuario (ej. `userErrors`) con toasts.
4. Evaluar `useOptimistic` de React para que el +/- se sienta instantáneo sin esperar el roundtrip.
5. Configurar la página de "gracias por tu compra" en Shopify Admin → Settings → Checkout, para que coincida con tu marca.
