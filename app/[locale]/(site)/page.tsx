import Banners from "@/components/sections/Banners";
import BestSeller from "@/components/sections/main/BestSeller";
import Categories from "@/components/sections/main/Categories";
import Collection from "@/components/sections/main/Collection";
import CollectionsCarousel from "@/components/sections/main/CollectionsCarousel";
import Fashion from "@/components/sections/main/Fashion";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { getContent } from "@/i18n/content";
import { hasLocale } from "@/i18n/routing";
import { getFragranceListByGender } from "@/lib/shopify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  generateHomeMetadata,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";

type MainContent = (typeof import("@/content/en"))["default"]["main"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const { main: content } = await getContent<{ main: MainContent }>(locale);
  const { productBanner } = await getContent<{
    productBanner: ProductBannerContent;
  }>(locale);

  const { products } = await getFragranceListByGender();

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
        <Hero content={content.hero} />
        <Fashion content={content.fashion} locale={locale} />
        <Categories content={content.categories} locale={locale} />
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
        <Collection
          content={content.collection}
          product={products}
          locale={locale}
        />
        <CollectionsCarousel content={products} locale={locale} />
        <BestSeller content={content.bestSeller} locale={locale} />
        <Banners content={content.banners} locale={locale} />
        <ProductsBanner content={productBanner} locale={locale} />
      </main>
    </>
  );
}
