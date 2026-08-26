export type Gender = "men" | "women";

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Metafield {
  value: string;
}

export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ProductCard {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  createdAt: string;
  productType: string;
  tags: string[];
  featuredImage: ProductImage | null;
  priceRange: { minVariantPrice: Money };
  volumen: Metafield | null;
  variants: { nodes: ProductVariant[] };
}

export interface ProductConnection {
  nodes: ProductCard[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}

export interface ProductCollection {
  id: string;
  handle: string;
  title: string;
  products: ProductConnection;
}

export interface FragranceProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  createdAt: string;
  tags: string[];
  descriptionHtml: string;
  priceRange: { minVariantPrice: Money };
  images: { nodes: ProductImage[] };
  variants: { nodes: ProductVariant[] };
  volumen: Metafield | null;
  tagline: Metafield | null;
  notaAlta: Metafield | null;
  notaCorazon: Metafield | null;
  notaBase: Metafield | null;
  familiaOlfativa: Metafield | null;
  descripcionNotas: Metafield | null;
}

export interface RelatedProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  featuredImage: ProductImage | null;
  priceRange: { minVariantPrice: Money };
}

export interface CartLineMerchandise {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  image: ProductImage | null;
  price: Money;
  product: { title: string; handle: string; tags: string[]; productType: string };
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: CartLineMerchandise;
}

export interface CartCost {
  totalAmount: Money;
  subtotalAmount: Money;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: { edges: Array<{ node: CartLine }> };
}

export interface ClothingProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  descriptionHtml: string;
  priceRange: { minVariantPrice: Money };
  images: { nodes: ProductImage[] };
  variants: { nodes: ProductVariant[] };
  longDescription: Metafield | null;
  fit: Metafield | null;
  manufacturing: Metafield | null;
  relatedProducts: { references: { nodes: RelatedProduct[] } } | null;
}
