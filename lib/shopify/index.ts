import "server-only";

import {
  CLOTHING_PRODUCT_QUERY,
  COLLECTION_PRODUCTS_QUERY,
  FRAGRANCE_PRODUCT_QUERY,
} from "@/lib/shopify/queries";
import type {
  ClothingProduct,
  FragranceProduct,
  Gender,
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
  FragranceProductPage,
} from "@/lib/shopify/transformers";

const COLLECTION_HANDLES = {
  fragrances: { men: "men-fragances", women: "women-fragances" },
  clothing: { men: "mens-clothing", women: "womens-clothing" },
} as const;

const REVALIDATE_SECONDS = 300;
const isDevelopment = process.env.NODE_ENV === "development";

type GraphQLError = { message: string };
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] };

function getStorefrontUrl() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
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
    throw new Error(`Shopify Storefront API request failed with status ${response.status}.`);
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${result.errors.map((error) => error.message).join("; ")}`);
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
  const first = options?.first ?? 10;

  if (gender) {
    const { collection } = await getFragrancesByGender(gender, { ...options, first });

    return {
      products: collection?.products.nodes.map(toFragranceListItem) ?? [],
      pageInfo: collection?.products.pageInfo ?? { hasNextPage: false, endCursor: null },
    };
  }

  const [men, women] = await Promise.all([
    getFragrancesByGender("men", { ...options, first }),
    getFragrancesByGender("women", { ...options, first }),
  ]);

  const menProducts = men.collection?.products.nodes ?? [];
  const womenProducts = women.collection?.products.nodes ?? [];

  return {
    products: [...menProducts, ...womenProducts].slice(0, first).map(toFragranceListItem),
    pageInfo: {
      hasNextPage:
        men.collection?.products.pageInfo.hasNextPage ||
        women.collection?.products.pageInfo.hasNextPage,
      endCursor:
        men.collection?.products.pageInfo.endCursor ??
        women.collection?.products.pageInfo.endCursor,
    },
  };
}

export async function getClothingListByGender(
  gender: Gender,
  options?: { first?: number; after?: string | null },
) {
  const { collection } = await getClothingByGender(gender, options);

  return {
    products: collection?.products.nodes.map(toClothingListItem) ?? [],
    pageInfo: collection?.products.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
}

export async function getFragranceProductPage(handle: string): Promise<FragranceProductPage | null> {
  const { product } = await getFragranceByHandle(handle);
  return product ? toFragranceProductPage(product) : null;
}

export async function getClothingProductPage(handle: string): Promise<ClothingProductPage | null> {
  const { product } = await getClothingByHandle(handle);
  return product ? toClothingProductPage(product) : null;
}

export type {
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
