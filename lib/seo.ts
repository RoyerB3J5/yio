import type { Metadata } from "next";
import type {
  FragranceProductPage,
  ClothingProductPage,
} from "@/lib/shopify/transformers";

const SITE_URL = "https://ybmybest.com/";
const SITE_NAME = "Your Best";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  noIndex?: boolean;
  noFollow?: boolean;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  path,
  images = [
    { url: "/images/main/hero.webp", width: 1200, height: 630, alt: SITE_NAME },
  ],
  noIndex = false,
  noFollow = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps): Metadata {
  const fullUrl = `${SITE_URL}${path}`;

  // Mapeamos "product" a "website" para OpenGraph estándar de Next.js
  const ogType = type === "product" ? "website" : type;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: fullUrl.replace("/es", "/en"),
        es: fullUrl.replace("/en", "/es"),
        "x-default": fullUrl.replace("/es", "/en"),
      },
    },
    openGraph: {
      type: ogType, // Usamos la variable mapeada aquí
      siteName: SITE_NAME,
      title,
      description,
      url: fullUrl,
      images: images.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
      locale: "en_US",
      alternateLocale: ["es_ES"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourbest",
      creator: "@yourbest",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };

  if (type === "article" && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: authors || [],
      tags: tags || [],
    };
  }

  // Para productos, la mejor práctica en SEO estructurado con Next.js es
  // mantener "website" en OpenGraph y agregar datos de producto vía JSON-LD (Schema.org).
  if (type === "product") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "website",
    };
  }

  return metadata;
}

export function generateProductJsonLd(
  product: FragranceProductPage | ClothingProductPage,
  path: string,
  locale: string,
  images: string[],
  price: number,
  currency = "USD",
  availability = "https://schema.org/InStock",
  brand = "Your Best",
) {
  const fullUrl = `${SITE_URL}${path}`;

  const isFragrance = "section1" in product;

  if (isFragrance) {
    const fragrance = product as FragranceProductPage;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${fragrance.section1.infoProduct.name} ${fragrance.section1.infoProduct.category}`,
      description: fragrance.section2.description,
      brand: {
        "@type": "Brand",
        name: brand,
      },
      image: images.length > 0 ? images : ["/images/main/hero.webp"],
      url: fullUrl,
      offers: {
        "@type": "Offer",
        url: fullUrl,
        priceCurrency: currency,
        price: price.toFixed(2),
        availability,
        seller: {
          "@type": "Organization",
          name: SITE_NAME,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: fragrance.section1.infoProduct.rate,
        reviewCount: 0,
      },
    };
  }

  const clothing = product as ClothingProductPage;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${clothing.hero.name} ${clothing.hero.category}`,
    description: clothing.hero.description,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    image: images.length > 0 ? images : ["/images/main/hero.webp"],
    url: fullUrl,
    offers: {
      "@type": "Offer",
      url: fullUrl,
      priceCurrency: currency,
      price: clothing.hero.price.toFixed(2),
      availability,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clothing.hero.rate,
      reviewCount: 0,
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/main/hero.webp`,
    sameAs: [
      "https://www.instagram.com/yovani.store",
      "https://www.tiktok.com/@yovani.b1",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-609-899-3421",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

export function generateCollectionPageMetadata(
  locale: string,
  gender: string,
  category: "fragances" | "clothes",
  _content: {
    hero: { title: string };
    gridProducts: { title: string };
  },
): Metadata {
  const genderLabel =
    locale === "es"
      ? gender === "men"
        ? "Hombres"
        : "Mujeres"
      : gender === "men"
        ? "Men"
        : "Women";
  const categoryLabel =
    category === "fragances"
      ? locale === "es"
        ? "Fragancias"
        : "Fragrances"
      : locale === "es"
        ? "Moda"
        : "Fashion";

  const title = `${genderLabel} ${categoryLabel} | ${SITE_NAME}`;
  const description =
    locale === "es"
      ? `Descubre nuestra colección de ${categoryLabel.toLowerCase()} para ${genderLabel.toLowerCase()}. Fragancias y moda exclusiva en Your Best.`
      : `Discover our ${categoryLabel.toLowerCase()} collection for ${genderLabel.toLowerCase()}. Exclusive fragrances and fashion at Your Best.`;

  return generateMetadata({
    title,
    description,
    path: `/${locale}/${category}/${gender}`,
    tags: [categoryLabel, genderLabel, "collection", "shop"],
  });
}

export function generateProductPageMetadata(
  locale: string,
  product: FragranceProductPage | ClothingProductPage,
  path: string,
  images: string[],
): Metadata {
  const isFragrance = "section1" in product;

  if (isFragrance) {
    const fragrance = product as FragranceProductPage;
    const title = `${fragrance.section1.infoProduct.name} ${fragrance.section1.infoProduct.category} | ${SITE_NAME}`;
    const description = fragrance.section2.description.slice(0, 160);

    return generateMetadata({
      title,
      description,
      path,
      images: images.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: title,
      })),
      type: "product",
      tags: [
        "fragrance",
        "perfume",
        fragrance.section1.infoProduct.name,
        "shop",
      ],
    });
  }

  const clothing = product as ClothingProductPage;
  const title = `${clothing.hero.name} ${clothing.hero.category} | ${SITE_NAME}`;
  const description = clothing.hero.description.slice(0, 160);

  return generateMetadata({
    title,
    description,
    path,
    images: images.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: title,
    })),
    type: "product",
    tags: ["clothing", "fashion", clothing.hero.name, "shop"],
  });
}

export function generateHomeMetadata(locale: string): Metadata {
  const isSpanish = locale === "es";

  return generateMetadata({
    title: isSpanish
      ? "Your Best | Boutique Online - Fragancias y Moda Exclusiva"
      : "Your Best | Online Boutique - Fragrances & Exclusive Fashion",
    description: isSpanish
      ? "Descubre Your Best - tu boutique online exclusiva de fragancias de lujo y moda. Compra colecciones curadas para hombre y mujer: perfumes de diseñador, ropa exclusiva y best sellers."
      : "Discover Your Best - your exclusive online boutique for luxury fragrances and fashion. Shop curated collections for men and women: designer perfumes, exclusive clothing, and best sellers.",
    path: `/${locale}`,
    tags: ["boutique", "fragrances", "fashion", "online shopping", "luxury"],
  });
}

export function generateBestSellersMetadata(locale: string): Metadata {
  const isSpanish = locale === "es";

  return generateMetadata({
    title: isSpanish
      ? "Best Sellers | Your Best - Lo Más Vendido"
      : "Best Sellers | Your Best - Top Rated Products",
    description: isSpanish
      ? "Descubre los productos más vendidos en Your Best. Fragancias y moda favoritas de nuestros clientes. Compra lo mejor del momento."
      : "Discover the best-selling products at Your Best. Customer-favorite fragrances and fashion. Shop the best of the moment.",
    path: `/${locale}/best-sellers`,
    tags: ["best sellers", "top rated", "popular", "fragrances", "fashion"],
  });
}
