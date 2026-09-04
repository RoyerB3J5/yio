# Shopify Integration: Fragrances & Clothes Pages

## Overview

This document explains how the **Fragrances** and **Clothes** pages fetch products from Shopify, covering both the API layer (backend) and the frontend components.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React/Next.js)                 │
│  ┌─────────────────────────┐   ┌─────────────────────────────┐  │
│  │  Page Components        │   │  Grid Components            │  │
│  │  - fragrances/[gender]  │   │  - GridProducts (fragances) │  │
│  │  - clothes/[gender]     │   │  - GridClothes              │  │
│  └───────────┬─────────────┘   └──────────────┬──────────────┘  │
│              │                                │                 │
│              ▼                                ▼                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    LIB/SHOPIFY (Server-side)                ││
│  │  - index.ts: Main API functions                            ││
│  │  - queries.ts: GraphQL queries                             ││
│  │  - transformers.ts: Data transformation                    ││
│  │  - types.ts: TypeScript types                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              SHOPIFY STOREFRONT API (GraphQL)               ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. API Layer (lib/shopify/)

### 1.1 Configuration (`index.ts`)

**Environment Variables Required:**
```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token
SHOPIFY_STOREFRONT_API_VERSION=2026-07
```

**Collection Handles (mapped by gender):**
```typescript
const COLLECTION_HANDLES = {
  fragrances: { men: "men-fragances", women: "womens-fragances" },
  clothing: { men: "mens-clothing", women: "womens-clothing" },
} as const;
```

**Caching Strategy:**
- Development: `no-store` (no caching)
- Production: `revalidate: 300` (5 minutes) with tags for invalidation

### 1.2 Core Fetch Function (`storefrontFetch`)

```typescript
async function storefrontFetch<T>(
  query: string,           // GraphQL query string
  variables: Record<string, unknown>,  // Query variables
  tags: string[]           // Cache tags for revalidation
): Promise<T>
```

**Headers sent:**
- `Content-Type: application/json`
- `X-Shopify-Storefront-Access-Token: ${token}`

### 1.3 GraphQL Queries (`queries.ts`)

| Query | Purpose | Variables |
|-------|---------|-----------|
| `COLLECTION_PRODUCTS_QUERY` | Fetch products from a collection by handle | `handle`, `first`, `after` |
| `FRAGRANCE_PRODUCTS_BY_GENDER_QUERY` | Search products by type + tag | `query`, `first`, `after` |
| `FRAGRANCE_PRODUCT_QUERY` | Single fragrance product details | `handle` |
| `CLOTHING_PRODUCT_QUERY` | Single clothing product details | `handle` |

**Shared Fragment - `PRODUCT_CARD_FRAGMENT`:**
```graphql
fragment ProductCard on Product {
  id
  handle
  title
  vendor
  createdAt
  productType
  tags
  featuredImage { url, altText }
  priceRange { minVariantPrice { amount, currencyCode } }
  volumen: metafield(namespace: "fragancia", key: "volumen") { value }
  variants(first: 10) { nodes { id, title, availableForSale, selectedOptions { name, value } } }
}
```

### 1.4 Public API Functions (`index.ts`)

#### Fragrances
```typescript
// Get fragrances by gender from collection
getFragrancesByGender(gender: Gender, options?)

// Get fragrances by gender tag (search-based)
getFragranceProductsByGenderTag(gender: Gender, options?)

// Main function used by fragrances page
getFragranceListByGender(gender?: Gender, options?): Promise<{
  products: FragranceListItem[],
  pageInfo: { hasNextPage, endCursor }
}>
```

#### Clothing
```typescript
// Get clothing by gender from collection
getClothingByGender(gender: Gender, options?)

// Main function used by clothes page
getClothingListByGender(gender: Gender, options?): Promise<{
  products: ClothingListItem[],
  pageInfo: { hasNextPage, endCursor }
}>
```

### 1.5 Data Transformation (`transformers.ts`)

#### FragranceListItem
```typescript
interface FragranceListItem {
  isNew: boolean;           // Created within 2 weeks
  isBestSeller: boolean;    // Tag contains "bestseller"
  gender?: Gender;          // Derived from tags
  productType: "fragrances";
  name: string;             // product.vendor
  category: string;         // product.title
  info: string;             // metafield: fragancia.volumen
  price: number;            // minVariantPrice.amount
  rate: number;             // Deterministic hash-based rating (4.0-5.0)
  img: string;              // featuredImage.url
  href: string;             // product.handle
  createdAt: string;
}
```

#### ClothingListItem
```typescript
interface ClothingListItem {
  // ... same base fields as FragranceListItem
  productType: "clothes";
  variants: Array<{ id, name, availableForSale }>;
}
```

**Key Transformation Logic:**
- `isNew`: Product created within 14 days
- `isBestSeller`: Tags contain "bestseller" or "bestselle"
- `gender`: Derived from tags (women/men keywords in multiple languages)
- `rate`: Deterministic hash of product ID → 4.0-5.0

---

## 2. Page Components (Frontend)

### 2.1 Fragrances Page (`app/[locale]/(site)/fragrances/[gender]/page.tsx`)

```tsx
import { getFragranceListByGender } from "@/lib/shopify";
import GridProducts from "@/components/sections/fragances/GridProducts";

export default async function Page({ params }: PageProps) {
  const { gender, locale } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";

  // Fetch products from Shopify (server-side)
  const { products } = await getFragranceListByGender(currentGender);

  return (
    <main>
      <Hero ... />
      <GridProducts
        content={content[currentGender].gridProducts}
        products={products}           // ← FragranceListItem[]
        gender={currentGender}
        locale={locale}
      />
      {/* ...other sections */}
    </main>
  );
}
```

**Data Flow:**
1. Page receives `gender` param from URL
2. Calls `getFragranceListByGender(gender)` → Server-side fetch
3. Passes `products` (FragranceListItem[]) to `GridProducts` component

### 2.2 Clothes Page (`app/[locale]/(site)/clothes/[gender]/page.tsx`)

```tsx
import { getClothingListByGender } from "@/lib/shopify";
import GridClothes from "@/components/sections/clothes/GridClothes";

export default async function Page({ params }: PageProps) {
  const { gender, locale } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";

  // Fetch products from Shopify (server-side)
  const { products } = await getClothingListByGender(currentGender);

  return (
    <main>
      <Hero ... />
      <GridClothes
        content={content[currentGender].gridProducts}
        products={products}           // ← ClothingListItem[]
        gender={currentGender}
        locale={locale}
      />
      {/* ...other sections */}
    </main>
  );
}
```

---

## 3. Grid Components (Client-Side)

### 3.1 GridProducts (Fragrances) - `components/sections/fragances/GridProducts.tsx`

```tsx
"use client";
import { FragranceListItem } from "@/lib/shopify/transformers";
import ProductCard from "@/components/ui/ProductCard";

interface GridProductsProps {
  content: { title, filter1, filter2, image1, image2? };
  gender: string;
  locale?: string;
  products: FragranceListItem[];    // ← Receives transformed data
}

export default function GridProducts({ products, ... }) {
  // Client-side sorting/filtering
  const sortedProducts = selectedSortOption.sortFn(products);

  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {sortedProducts.map((item, index) => (
          <ProductCard
            key={item.href}
            item={item}              // ← Passes FragranceListItem
            locale={locale}
            gender={gender}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
```

**Features:**
- Client-side sorting: All, Price High-Low, Price Low-High, Newest, Best Sellers
- Promotional banner images interleaved in grid
- Uses `ProductCard` for individual product display

### 3.2 GridClothes (Clothing) - `components/sections/clothes/GridClothes.tsx`

```tsx
"use client";
import { ClothingListItem, FragranceListItem } from "@/lib/shopify/transformers";

type ProductItem = ClothingListItem | FragranceListItem;

interface GridProductsProps {
  content: { title, filter1, filter2 };
  gender?: string;
  locale?: string;
  products: ProductItem[];          // ← Union type for both
}

export default function GridProducts({ products, gender, locale }) {
  const sortedProducts = selectedSortOption.sortFn(products);

  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {sortedProducts.map((item, index) => {
          const productType = item.productType ?? "clothes";
          const productGender = item.gender ?? gender;
          const productHref = `/${[locale, productType, productGender, item.href].filter(Boolean).join("/")}`;

          return (
            <div key={index}>
              <Link href={productHref}>
                <ProductImage src={item.img} ... />
              </Link>
              {/* Variant size selector for clothing */}
              {productType === "clothes" && "variants" in item && (
                <div>
                  {item.variants.map(variant => (
                    <Link href={`${productHref}?variant=${variant.id}`}>
                      {variant.name}
                    </Link>
                  ))}
                </div>
              )}
              {/* Product info: name, category, price, rating, badges */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

**Key Differences from Fragrances Grid:**
- Supports both `ClothingListItem` and `FragranceListItem` (union type)
- Shows variant size selector for clothing products
- Dynamically constructs product URLs based on `productType` and `gender`
- Different image rendering (object-cover vs object-contain)

---

## 4. Complete Data Flow Summary

### Fragrances Page
```
URL: /en/fragrances/men
         │
         ▼
Page Component (Server Component)
         │
         ▼
getFragranceListByGender("men")
         │
         ▼
getFragrancesByGender("men") → getCollectionProducts("men-fragances")
         │
         ▼
storefrontFetch(COLLECTION_PRODUCTS_QUERY, { handle: "men-fragances", first: 10 })
         │
         ▼
SHOPIFY GRAPHQL API
         │
         ▼
Response: ProductCard[]
         │
         ▼
toFragranceListItem() transform
         │
         ▼
FragranceListItem[]
         │
         ▼
GridProducts Component (Client)
         │
         ▼
ProductCard Components
```

### Clothes Page
```
URL: /en/clothes/women
         │
         ▼
Page Component (Server Component)
         │
         ▼
getClothingListByGender("women")
         │
         ▼
getClothingByGender("women") → getCollectionProducts("womens-clothing")
         │
         ▼
storefrontFetch(COLLECTION_PRODUCTS_QUERY, { handle: "womens-clothing", first: 20 })
         │
         ▼
SHOPIFY GRAPHQL API
         │
         ▼
Response: ProductCard[]
         │
         ▼
toClothingListItem() transform
         │
         ▼
ClothingListItem[]
         │
         ▼
GridClothes Component (Client)
         │
         ▼
ProductImage + Variant Links
```

---

## 5. Key Differences: Fragrances vs Clothes

| Aspect | Fragrances | Clothes |
|--------|------------|---------|
| **Collection Handles** | `men-fragances`, `womens-fragances` | `mens-clothing`, `womens-clothing` |
| **Query Method** | Collection-based OR tag-based search | Collection-based only |
| **List Item Type** | `FragranceListItem` | `ClothingListItem` |
| **Extra Fields** | `info` (volumen metafield) | `variants` (size/variant options) |
| **Detail Query** | `FRAGRANCE_PRODUCT_QUERY` (olfactive notes) | `CLOTHING_PRODUCT_QUERY` (fit, manufacturing, related) |
| **Grid Component** | `GridProducts` (fragances) | `GridClothes` |
| **Image Display** | object-contain (centered) | object-cover (full) |
| **Variant Selector** | No | Yes (size links) |

---

## 6. Usage Examples

### Fetching Fragrances in a Component
```typescript
// Server Component
import { getFragranceListByGender } from "@/lib/shopify";

async function MyComponent() {
  const { products, pageInfo } = await getFragranceListByGender("men", { first: 20 });
  
  // products: FragranceListItem[]
  // pageInfo: { hasNextPage, endCursor }
}
```

### Fetching Clothing in a Component
```typescript
// Server Component
import { getClothingListByGender } from "@/lib/shopify";

async function MyComponent() {
  const { products, pageInfo } = await getClothingListByGender("women", { first: 20 });
  
  // products: ClothingListItem[]
  // pageInfo: { hasNextPage, endCursor }
}
```

### Accessing Product Data in Frontend
```tsx
// In GridProducts/GridClothes or ProductCard
const product: FragranceListItem | ClothingListItem = products[0];

// Common fields
product.name;        // Brand/vendor name
product.category;    // Product title
product.price;       // Price as number
product.img;         // Image URL
product.href;        // Handle for URL construction
product.isNew;       // Boolean
product.isBestSeller; // Boolean
product.rate;        // Rating 4.0-5.0

// Clothing-specific
if (product.productType === "clothes" && "variants" in product) {
  product.variants.map(v => v.name); // Size variants
}
```

---

## 7. Cache Invalidation

To invalidate cache after product updates:
```typescript
// Tags used: "shopify", "shopify:collection:${handle}", "shopify:fragrance:${gender}"
// Use Next.js revalidateTag() or deploy to trigger revalidation
```

---

## 8. Error Handling

- **API Errors**: Thrown as `Error` with descriptive messages
- **Missing Env Vars**: Throws on `getStorefrontUrl()` / `getAccessToken()`
- **GraphQL Errors**: Collected and thrown as single error
- **Network Errors**: HTTP status check with custom message
- **No Data**: Throws "Shopify Storefront API returned no data."

---

## 9. TypeScript Types Reference

```typescript
// From lib/shopify/types.ts
type Gender = "men" | "women";

interface ProductCard {           // Raw Shopify response
  id, handle, title, vendor, createdAt, productType, tags[];
  featuredImage: { url, altText } | null;
  priceRange: { minVariantPrice: { amount, currencyCode } };
  volumen: { value } | null;
  variants: { nodes: ProductVariant[] };
}

// From lib/shopify/transformers.ts
interface FragranceListItem {     // Transformed for UI
  isNew, isBestSeller, gender?, productType: "fragrances";
  name, category, info, price, rate, img, href, createdAt;
}

interface ClothingListItem {      // Transformed for UI
  isNew, isBestSeller, gender?, productType: "clothes";
  name, category, price, rate, img, href, variants[], createdAt;
}
```

---

*Document generated from codebase analysis. Last updated: 2026*