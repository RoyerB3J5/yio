import Banners from "@/components/sections/Banners";
import GridClothes from "@/components/sections/clothes/GridClothes";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { getBestSellerProducts } from "@/lib/shopify";
import { getContent } from "@/i18n/content";
import { hasLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  generateBestSellersMetadata,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";

type MainContent = (typeof import("@/content/en"))["default"]["main"];
type BestSellersContent =
  (typeof import("@/content/en"))["default"]["bestSellers"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateBestSellersMetadata(locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const {
    main: fixedContent,
    bestSellers: content,
    productBanner,
  } = await getContent<{
    main: MainContent;
    bestSellers: BestSellersContent;
    productBanner: ProductBannerContent;
  }>(locale);
  const { products: bestSellerProducts, pageInfo } = await getBestSellerProducts();

  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main className="w-full flex flex-col justify-center items-center pt-(--top-bar-height)">
        <Hero content={content.hero} changeColor={content.hero.changeColor} />
        {/*<pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full block">
          <code>
            {JSON.stringify(
              productos,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2,
            )}
          </code>
        </pre> */}
        <GridClothes
          content={content.gridProducts}
          products={bestSellerProducts}
          locale={locale}
          pageInfo={pageInfo}
          pageType="bestsellers"
        />
        <Banners content={fixedContent.banners} locale={locale} />
        <ProductsBanner content={productBanner} locale={locale} />
      </main>
    </>
  );
}
