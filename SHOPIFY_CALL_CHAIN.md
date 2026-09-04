# Shopify Call Chain: Fragrances & Clothes Pages Only

## Fragrances Page — `getFragranceListByGender()`

```
app/[locale]/(site)/fragrances/[gender]/page.tsx:59
    const { products } = await getFragranceListByGender(currentGender);
            │
            ▼
lib/shopify/index.ts:178  getFragranceListByGender(gender, options?)
            │
            ├─ if gender provided (line 184-198):
            │     const { collection } = await getFragrancesByGender(gender, { ...options, first });
            │                    │
            │                    ▼
            │     lib/shopify/index.ts:148  getFragrancesByGender(gender, options?)
            │                    │
            │                    ▼
            │     line 152: return getCollectionProducts(COLLECTION_HANDLES.fragrances[gender], options);
            │                    │
            │                    ▼
            │     lib/shopify/index.ts:119  getCollectionProducts(handle, { first, after })
            │                    │
            │                    ▼
            │     line 123-127: storefrontFetch(COLLECTION_PRODUCTS_QUERY, { handle, first, after }, tags)
            │                    │
            │                    ▼
            │     lib/shopify/index.ts:73  storefrontFetch(query, variables, tags)
            │                    │
            │                    ▼
            │     line 78-88: fetch(getStorefrontUrl(), { method: "POST", headers: { "X-Shopify-Storefront-Access-Token": getAccessToken() }, body: JSON.stringify({ query, variables }), next: { revalidate: 300, tags } })
            │                    │
            │                    ▼
            │     lib/shopify/index.ts:49  getStorefrontUrl() → `https://${domain}/api/${version}/graphql.json`
            │     lib/shopify/index.ts:63  getAccessToken() → process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
            │                    │
            │                    ▼
            │     lib/shopify/queries.ts:37  COLLECTION_PRODUCTS_QUERY + PRODUCT_CARD_FRAGMENT
            │                    │
            │                    ▼
            │     HTTP POST → Shopify Storefront API
            │                    │
            │                    ▼
            │     Response processing (lines 90-108) → returns { collection: ProductCollection }
            │                    │
            │                    ▼
            │     Back in getFragranceListByGender (lines 190-198):
            │     products: collection?.products.nodes.map(p => toFragranceListItem(p, gender)) ?? []
            │                    │
            │                    ▼
            │     lib/shopify/transformers.ts:209  toFragranceListItem(product, gender)
            │                    │
            ▼
         Returns { products: FragranceListItem[], pageInfo }
```

**Collection handle used:** `COLLECTION_HANDLES.fragrances[gender]` → `"men-fragances"` or `"womens-fragances"`

---

## Clothes Page — `getClothingListByGender()`

```
app/[locale]/(site)/clothes/[gender]/page.tsx:51
    const { products } = await getClothingListByGender(currentGender);
            │
            ▼
lib/shopify/index.ts:234  getClothingListByGender(gender, options?)
            │
            ▼
     line 238: const { collection } = await getClothingByGender(gender, options);
                    │
                    ▼
     lib/shopify/index.ts:155  getClothingByGender(gender, options?)
                    │
                    ▼
     line 159: return getCollectionProducts(COLLECTION_HANDLES.clothing[gender], options);
                    │
                    ▼
     lib/shopify/index.ts:119  getCollectionProducts(handle, { first, after })
                    │
                    ▼
     line 123-127: storefrontFetch(COLLECTION_PRODUCTS_QUERY, { handle, first, after }, tags)
                    │
                    ▼
     lib/shopify/index.ts:73  storefrontFetch(query, variables, tags)
                    │
                    ▼
     line 78-88: fetch(getStorefrontUrl(), { method: "POST", headers: { "X-Shopify-Storefront-Access-Token": getAccessToken() }, body: JSON.stringify({ query, variables }), next: { revalidate: 300, tags } })
                    │
                    ▼
     lib/shopify/index.ts:49  getStorefrontUrl()
     lib/shopify/index.ts:63  getAccessToken()
                    │
                    ▼
     lib/shopify/queries.ts:37  COLLECTION_PRODUCTS_QUERY + PRODUCT_CARD_FRAGMENT
                    │
                    ▼
     HTTP POST → Shopify Storefront API
                    │
                    ▼
     Response processing (lines 90-108) → returns { collection: ProductCollection }
                    │
                    ▼
     Back in getClothingListByGender (lines 240-249):
     products: collection?.products.nodes.map(p => toClothingListItem(p, gender)) ?? []
                    │
                    ▼
     lib/shopify/transformers.ts:226  toClothingListItem(product, gender)
                    │
                    ▼
     Returns { products: ClothingListItem[], pageInfo }
```

**Collection handle used:** `COLLECTION_HANDLES.clothing[gender]` → `"mens-clothing"` or `"womens-clothing"`

---

## Shared Functions (Used by Both)

| Function | File | Line |
|----------|------|------|
| `getCollectionProducts` | `lib/shopify/index.ts` | 119 |
| `storefrontFetch` | `lib/shopify/index.ts` | 73 |
| `getStorefrontUrl` | `lib/shopify/index.ts` | 49 |
| `getAccessToken` | `lib/shopify/index.ts` | 63 |
| `COLLECTION_PRODUCTS_QUERY` | `lib/shopify/queries.ts` | 37 |
| `PRODUCT_CARD_FRAGMENT` | `lib/shopify/queries.ts` | 1 |

---

## Transformers (Different per Page)

| Page | Transformer | File | Line | Output Type |
|------|-------------|------|------|-------------|
| Fragrances | `toFragranceListItem` | `lib/shopify/transformers.ts` | 209 | `FragranceListItem` |
| Clothes | `toClothingListItem` | `lib/shopify/transformers.ts` | 226 | `ClothingListItem` |

---

## Environment Variables

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxx
SHOPIFY_STOREFRONT_API_VERSION=2026-07
```