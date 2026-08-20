This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Shopify Storefront data layer

Copy `.env.example` to `.env.local`, then set `SHOPIFY_STORE_DOMAIN` and a private Storefront API token created in **Shopify Admin → Headless**. The token is deliberately not exposed through a `NEXT_PUBLIC_` variable.

Server Components can import the raw, typed responses from `@/lib/shopify` when the UI is connected:

```ts
import {
  getClothingListByGender,
  getFragranceProductPage,
} from "@/lib/shopify";

const { products } = await getClothingListByGender("women");
const productInfo = await getFragranceProductPage("le-male");
```

`getFragranceListByGender`, `getClothingListByGender`, `getFragranceProductPage`, and `getClothingProductPage` return view-ready data. The lower-level `get*ByGender` and `get*ByHandle` functions remain available when a raw Shopify response is needed.

The calls use the Storefront API. They are uncached in development so Shopify edits are visible immediately; in production they are cached for five minutes and tagged per collection/product for future on-demand invalidation. The current pages intentionally still use their local placeholder data.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
