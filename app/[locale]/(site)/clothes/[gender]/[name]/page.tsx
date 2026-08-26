import Banners from "@/components/sections/Banners";
import DescriptionItem from "@/components/sections/clothes/DescriptionItem";
import HeroItem from "@/components/sections/clothes/HeroItem";
import RecommendedItem from "@/components/sections/clothes/RecommendedItem";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { getContent } from "@/i18n/content";
import { hasLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getClothingProductPage, getRecommendedClothing } from "@/lib/shopify";
import type { Metadata } from "next";
import {
  generateProductPageMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";
import type { ClothingProductPage } from "@/lib/shopify/transformers";

type MainContent = (typeof import("@/content/en"))["default"]["main"];
type IndividualClothesContent =
  (typeof import("@/content/en"))["default"]["individualClothes"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];

interface PageProps {
  params: Promise<{ gender: string; name: string; locale: string }>;
  searchParams: Promise<{ variant?: string | string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name, locale } = await params;
  const product = await getClothingProductPage(name);
  if (!product) {
    return generateProductPageMetadata(locale, {} as ClothingProductPage, `/${locale}/clothes`, []);
  }
  const path = `/${locale}/clothes/${product.hero.name.toLowerCase().replace(/\s+/g, "-")}/${name}`;
  return generateProductPageMetadata(locale, product, path, product.images);
}

export default async function SingleFragrance({
  params,
  searchParams,
}: PageProps) {
  const { name, locale } = await params;
  const { variant } = await searchParams;
  if (!hasLocale(locale)) {
    notFound();
  }
  const {
    main: fixedContent,
    individualClothes: content,
    productBanner,
  } = await getContent<{
    main: MainContent;
    individualClothes: IndividualClothesContent;
    productBanner: ProductBannerContent;
  }>(locale);
  const product = await getClothingProductPage(name);
  const initialVariantId = typeof variant === "string" ? variant : undefined;
  const { products: recommendedProducts } = await getRecommendedClothing({
    first: 4,
  });
  if (!product || !recommendedProducts) {
    notFound();
  }
  // `productInfo` matches the HeroItem and DescriptionItem props.
  // product contains the raw Shopify clothing detail data.

  const path = `/${locale}/clothes/${product.hero.name.toLowerCase().replace(/\s+/g, "-")}/${name}`;
  const productJsonLd = generateProductJsonLd(product, path, locale, product.images, product.hero.price);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `/${locale}` },
    { name: "Fashion", url: `/${locale}/clothes/${product.hero.name.toLowerCase().replace(/\s+/g, "-")}` },
    { name: `${product.hero.name} ${product.hero.category}`, url: path },
  ]);
  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main className="w-full flex flex-col justify-center items-center pt-(--header-height)">
        <HeroItem
          product={product.hero}
          content={content}
          images={product.images}
          initialVariantId={initialVariantId}
        />
        {/*<pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full block">
          <code>
            {JSON.stringify(
              productInfoTest,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2,
            )}
          </code>
        </pre> */}
        <DescriptionItem
          description={product.information}
          images={product.images}
        />
        <RecommendedItem
          label={content.recomendado}
          products={recommendedProducts}
        />
        <Banners content={fixedContent.banners} locale={locale} />
        <ProductsBanner content={productBanner} locale={locale} />
      </main>
    </>
  );
}
