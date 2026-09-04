import "server-only";

import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
  CLOTHING_PRODUCT_QUERY,
  COLLECTION_PRODUCTS_QUERY,
  FRAGRANCE_PRODUCT_QUERY,
  FRAGRANCE_PRODUCTS_BY_GENDER_QUERY,
  RECOMMENDED_CLOTHING_QUERY,
  RECOMMENDED_FRAGRANCE_QUERY,
} from "@/lib/shopify/queries";
import type {
  Cart,
  ClothingProduct,
  FragranceProduct,
  Gender,
  ProductCard,
  ProductCollection,
} from "@/lib/shopify/types";
import {
  toClothingListItem,
  toClothingProductPage,
  toFragranceListItem,
  toFragranceProductPage,
} from "@/lib/shopify/transformers";
import type {
  ClothingProductPage,
  FragranceListItem,
  FragranceProductPage,
} from "@/lib/shopify/transformers";

const COLLECTION_HANDLES = {
  fragrances: { men: "men-fragances", women: "womens-fragances" },
  clothing: { men: "mens-clothing", women: "womens-clothing" },
} as const;

const BEST_SELLER_COLLECTION_HANDLE = "bestseller";

const REVALIDATE_SECONDS = 300;
const isDevelopment = process.env.NODE_ENV === "development";

type GraphQLError = { message: string };
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] };

function getStorefrontUrl() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(
    /^https?:\/\//,
    "",
  ).replace(/\/$/, "");
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

  if (!domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN.");
  }

  return `https://${domain}/api/${version}/graphql.json`;
}

function getAccessToken() {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
  }

  return token;
}

async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown>,
  tags: string[],
): Promise<T> {
  const response = await fetch(getStorefrontUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": getAccessToken(),
    },
    body: JSON.stringify({ query, variables }),
    ...(isDevelopment
      ? { cache: "no-store" as const }
      : { next: { revalidate: REVALIDATE_SECONDS, tags } }),
  });

  if (!response.ok) {
    throw new Error(
      `Shopify Storefront API request failed with status ${response.status}.`,
    );
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors?.length) {
    throw new Error(
      `Shopify Storefront API error: ${result.errors.map((error) => error.message).join("; ")}`,
    );
  }

  if (!result.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return result.data;
}

function normalizeFirst(first: number) {
  if (!Number.isInteger(first) || first < 1 || first > 100) {
    throw new Error("The product page size must be an integer from 1 to 100.");
  }

  return first;
}

async function getCollectionProducts(
  handle: string,
  { first = 20, after }: { first?: number; after?: string | null } = {},
) {
  return storefrontFetch<{ collection: ProductCollection | null }>(
    COLLECTION_PRODUCTS_QUERY,
    { handle, first: normalizeFirst(first), after: after ?? null },
    ["shopify", `shopify:collection:${handle}`],
  );
}

async function getFragranceProductsByGenderTag(
  gender: Gender,
  { first = 20, after }: { first?: number; after?: string | null } = {},
) {
  const query = `product_type:Fragrances AND tag:${gender}`;

  return storefrontFetch<{
    products: {
      nodes: ProductCard[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(
    FRAGRANCE_PRODUCTS_BY_GENDER_QUERY,
    { query, first: normalizeFirst(first), after: after ?? null },
    ["shopify", `shopify:fragrance:${gender}`],
  );
}

export function getFragrancesByGender(
  gender: Gender,
  options?: { first?: number; after?: string | null },
) {
  return getCollectionProducts(COLLECTION_HANDLES.fragrances[gender], options);
}

export function getClothingByGender(
  gender: Gender,
  options?: { first?: number; after?: string | null },
) {
  return getCollectionProducts(COLLECTION_HANDLES.clothing[gender], options);
}

export function getFragranceByHandle(handle: string) {
  return storefrontFetch<{ product: FragranceProduct | null }>(
    FRAGRANCE_PRODUCT_QUERY,
    { handle },
    ["shopify", `shopify:product:${handle}`],
  );
}

export function getClothingByHandle(handle: string) {
  return storefrontFetch<{ product: ClothingProduct | null }>(
    CLOTHING_PRODUCT_QUERY,
    { handle },
    ["shopify", `shopify:product:${handle}`],
  );
}

export async function getFragranceListByGender(
  gender?: Gender,
  options?: { first?: number; after?: string | null },
) {
  const first = options?.first ?? 20;

  if (gender) {
    const { collection } = await getFragrancesByGender(gender, {
      ...options,
      first,
    });

    return {
      products:
        collection?.products.nodes.map((p) => toFragranceListItem(p, gender)) ??
        [],
      pageInfo: collection?.products.pageInfo ?? {
        hasNextPage: false,
        endCursor: null,
      },
    };
  }

  const perGender = Math.ceil(first / 2);
  const [men, women] = await Promise.all([
    getFragranceProductsByGenderTag("men", { ...options, first: perGender }),
    getFragranceProductsByGenderTag("women", { ...options, first: perGender }),
  ]);

  const menProducts = men.products.nodes.map((p) =>
    toFragranceListItem(p, "men"),
  );
  const womenProducts = women.products.nodes.map((p) =>
    toFragranceListItem(p, "women"),
  );

  // Interleave products from both genders so we get half men, half women (total 10)
  const interleaved: FragranceListItem[] = [];
  const maxLen = Math.max(menProducts.length, womenProducts.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < menProducts.length) interleaved.push(menProducts[i]);
    if (i < womenProducts.length) interleaved.push(womenProducts[i]);
  }

  return {
    products: interleaved.slice(0, first),
    pageInfo: {
      hasNextPage:
        men.products.pageInfo.hasNextPage ||
        women.products.pageInfo.hasNextPage,
      endCursor:
        men.products.pageInfo.endCursor ?? women.products.pageInfo.endCursor,
    },
  };
}

export async function getClothingListByGender(
  gender: Gender,
  options?: { first?: number; after?: string | null },
) {
  const { collection } = await getClothingByGender(gender, options);

  return {
    products:
      collection?.products.nodes.map((product) =>
        toClothingListItem(product, gender),
      ) ?? [],
    pageInfo: collection?.products.pageInfo ?? {
      hasNextPage: false,
      endCursor: null,
    },
  };
}

export async function getFragranceProductPage(
  handle: string,
): Promise<FragranceProductPage | null> {
  const { product } = await getFragranceByHandle(handle);
  return product ? toFragranceProductPage(product) : null;
}

export async function getClothingProductPage(
  handle: string,
): Promise<ClothingProductPage | null> {
  const { product } = await getClothingByHandle(handle);
  return product ? toClothingProductPage(product) : null;
}

export async function getBestSellerProducts(
  options: { first?: number; after?: string | null } = {},
) {
  const { collection } = await getCollectionProducts(
    BEST_SELLER_COLLECTION_HANDLE,
    { ...options, first: options.first ?? 20 },
  );
  const products = collection?.products;

  return {
    products: (products?.nodes ?? []).map((product) =>
      ["fragrances", "fragrances"].includes(product.productType.toLowerCase())
        ? toFragranceListItem(product)
        : toClothingListItem(product),
    ),
    pageInfo: products?.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
}

export async function createCart(
  lines: Array<{ merchandiseId: string; quantity: number }> = [],
): Promise<Cart> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(CART_CREATE, { input: { lines } }, ["shopify", "shopify:cart"]);

  console.log("createCart raw response:", JSON.stringify(data, null, 2));

  if (data.cartCreate.userErrors.length) {
    throw new Error(
      data.cartCreate.userErrors
        .map((e) => `${e.field}: ${e.message}`)
        .join(", "),
    );
  }

  return data.cartCreate.cart;
}

export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  const data = await storefrontFetch<{
    cartLinesAdd: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(CART_LINES_ADD, { cartId, lines }, ["shopify", "shopify:cart"]);

  console.log("addCartLines raw response:", JSON.stringify(data, null, 2));

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(
      data.cartLinesAdd.userErrors
        .map((e) => `${e.field}: ${e.message}`)
        .join(", "),
    );
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<Cart> {
  const data = await storefrontFetch<{
    cartLinesUpdate: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(CART_LINES_UPDATE, { cartId, lines }, ["shopify", "shopify:cart"]);

  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await storefrontFetch<{
    cartLinesRemove: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(CART_LINES_REMOVE, { cartId, lineIds }, ["shopify", "shopify:cart"]);

  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefrontFetch<{ cart: Cart | null }>(
    CART_QUERY,
    { cartId },
    ["shopify", "shopify:cart"],
  );

  return data.cart;
}

export async function getRecommendedClothing(
  options: { first?: number; after?: string | null } = {},
  gender?: Gender,
) {
  return getClothingListByGender(gender ?? "men", options);
}

export async function getRecommendedFragrance(
  options: { first?: number; after?: string | null } = {},
  gender?: Gender,
) {
  return getFragranceListByGender(gender, options);
}

export type {
  Cart,
  ClothingProduct,
  FragranceProduct,
  Gender,
  ProductCollection,
} from "@/lib/shopify/types";
export type {
  ClothingListItem,
  ClothingProductPage,
  FragranceListItem,
  FragranceProductPage,
} from "@/lib/shopify/transformers";
