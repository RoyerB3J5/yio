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
