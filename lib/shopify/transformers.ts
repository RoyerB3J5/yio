import type {
  ClothingProduct,
  FragranceProduct,
  Gender,
  ProductCard,
  ProductImage,
  ProductVariant,
  RelatedProduct,
} from "@/lib/shopify/types";

export interface FragranceListItem {
  isNew: boolean;
  isBestSeller: boolean;
  gender?: Gender;
  name: string;
  category: string;
  info: string;
  price: number;
  rate: number;
  img: string;
  href: string;
  createdAt: string;
}

export interface ClothingListItem {
  isNew: boolean;
  isBestSeller: boolean;
  name: string;
  category: string;
  price: number;
  rate: number;
  img: string;
  href: string;
  variants: Array<{
    id: string;
    name: string;
    availableForSale: boolean;
  }>;
  createdAt: string;
}

export interface FragranceProductPage {
  section1: {
    image: string;
    infoProduct: Omit<FragranceListItem, "isBestSeller" | "href"> & { idVariant: string };
  };
  section2: { title: string; description: string; img: string };
  section3: string[];
  section4: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    img: string;
  };
}

export interface ClothingProductPage {
  hero: {
    name: string;
    category: string;
    description: string;
    variants: ClothingListItem["variants"];
    rate: number;
    price: number;
    accompanies: Array<{
      name: string;
      category: string;
      price: number;
      img: string;
      href: string;
    }>;
  };
  images: string[];
  information: {
    description: string;
    tags: Array<{ title: string; description: string[] }>;
  };
}

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

function toPrice(amount: string) {
  const price = Number(amount);
  return Number.isFinite(price) ? price : 0;
}

function isNew(createdAt: string, now = Date.now()) {
  const createdAtMs = Date.parse(createdAt);
  return (
    Number.isFinite(createdAtMs) &&
    createdAtMs >= now - THREE_DAYS_IN_MS &&
    createdAtMs <= now
  );
}

function isBestSeller(tags: string[]) {
  return tags.some((tag) => {
    const normalizedTag = tag.toLowerCase().replace(/[\s_-]/g, "");
    return normalizedTag === "bestseller" || normalizedTag === "bestselle";
  });
}

function genderFromTags(tags: string[]): Gender | undefined {
  const normalized = tags.map((tag) => tag.toLowerCase());

  if (normalized.includes("women")) return "women";
  if (normalized.includes("men")) return "men";

  return undefined;
}

function productRating(id: string) {
  let hash = 0;

  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  }

  return Number((4 + (hash % 11) / 10).toFixed(1));
}

function imageUrl(image: ProductImage | null | undefined) {
  return image?.url ?? "";
}

function imageAt(images: ProductImage[], index: number) {
  return imageUrl(images[index] ?? images[0]);
}

function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>(\n)?/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function richTextToText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.map(richTextToText).filter(Boolean).join("\n");

  if (value && typeof value === "object") {
    const node = value as { value?: unknown; children?: unknown };
    const text = typeof node.value === "string" ? node.value : "";
    const children = richTextToText(node.children);
    return [text, children].filter(Boolean).join("\n");
  }

  return "";
}

function metafieldText(value: string | null | undefined) {
  if (!value) return "";

  try {
    return richTextToText(JSON.parse(value)).trim();
  } catch {
    return value.trim();
  }
}

function metafieldList(value: string | null | undefined) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed
          .flatMap((item) =>
            metafieldText(
              typeof item === "string" ? item : JSON.stringify(item),
            ),
          )
          .filter(Boolean)
      : [richTextToText(parsed)].filter(Boolean);
  } catch {
    return [value.trim()].filter(Boolean);
  }
}

function toVariants(variants: ProductVariant[]) {
  return variants.map((variant) => ({
    id: variant.id,
    name: variant.selectedOptions[0]?.value ?? variant.title,
    availableForSale: variant.availableForSale,
  }));
}

export function toFragranceListItem(product: ProductCard): FragranceListItem {
  return {
    isNew: isNew(product.createdAt),
    isBestSeller: isBestSeller(product.tags),
    gender: genderFromTags(product.tags),
    name: product.vendor,
    category: product.title,
    info: product.volumen?.value ?? "",
    price: toPrice(product.priceRange.minVariantPrice.amount),
    rate: productRating(product.id),
    img: imageUrl(product.featuredImage),
    href: product.handle,
    createdAt: product.createdAt,
  };
}

export function toClothingListItem(product: ProductCard): ClothingListItem {
  return {
    isNew: isNew(product.createdAt),
    isBestSeller: isBestSeller(product.tags),
    name: product.vendor,
    category: product.title,
    price: toPrice(product.priceRange.minVariantPrice.amount),
    rate: productRating(product.id),
    img: imageUrl(product.featuredImage),
    href: product.handle,
    variants: toVariants(product.variants.nodes),
    createdAt: product.createdAt,
  };
}

function notesTitle(product: FragranceProduct) {
  return [
    product.notaAlta?.value,
    product.notaCorazon?.value,
    product.notaBase?.value,
  ]
    .filter((note): note is string => Boolean(note))
    .join(". ");
}

export function toFragranceProductPage(
  product: FragranceProduct,
): FragranceProductPage {
  const images = product.images.nodes;
  const firstVariant = product.variants.nodes[0];
  const card = {
    isNew: isNew(product.createdAt),
    name: product.vendor,
    category: product.title,
    info: product.volumen?.value ?? "",
    price: toPrice(product.priceRange.minVariantPrice.amount),
    createdAt: product.createdAt,
    rate: productRating(product.id),
    img: imageAt(images, 0),
    idVariant: firstVariant?.id ?? "",
  };

  return {
    section1: {
      image: imageAt(images, 1),
      infoProduct: card,
    },
    section2: {
      title: product.tagline?.value ?? product.title,
      description: htmlToText(product.descriptionHtml),
      img: imageAt(images, 2),
    },
    section3: [imageAt(images, 3), imageAt(images, 4)],
    section4: {
      tag: "NOTAS ALTAS - NOTAS DEL CORAZÓN - NOTAS BÁSICAS",
      title: notesTitle(product),
      subtitle: product.familiaOlfativa?.value ?? "",
      description: metafieldText(product.descripcionNotas?.value),
      img: imageAt(images, 5),
    },
  };
}

function toAccompanyingProduct(product: RelatedProduct) {
  return {
    name: product.vendor,
    category: product.title,
    price: toPrice(product.priceRange.minVariantPrice.amount),
    img: imageUrl(product.featuredImage),
    href: product.handle,
  };
}

export function toClothingProductPage(
  product: ClothingProduct,
): ClothingProductPage {
  return {
    hero: {
      name: product.vendor,
      category: product.title,
      description: htmlToText(product.descriptionHtml),
      variants: toVariants(product.variants.nodes),
      rate: productRating(product.id),
      price: toPrice(product.priceRange.minVariantPrice.amount),
      accompanies:
        product.relatedProducts?.references.nodes.map(toAccompanyingProduct) ??
        [],
    },
    images: product.images.nodes.map((image) => image.url),
    information: {
      description: htmlToText(product.descriptionHtml),
      tags: [
        {
          title: "Descripción",
          description: metafieldList(product.longDescription?.value),
        },
        { title: "Ajuste", description: metafieldList(product.fit?.value) },
        {
          title: "Fabricación",
          description: metafieldList(product.manufacturing?.value),
        },
      ].filter((tag) => tag.description.length > 0),
    },
  };
}
