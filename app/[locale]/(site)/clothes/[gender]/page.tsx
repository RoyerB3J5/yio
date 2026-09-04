import Banners from "@/components/sections/Banners";
import GridClothes from "@/components/sections/clothes/GridClothes";
import BestSeller from "@/components/sections/main/BestSeller";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { getContent } from "@/i18n/content";
import { hasLocale, Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getClothingListByGender } from "@/lib/shopify";
import type { Metadata } from "next";
import {
  generateCollectionPageMetadata,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";

type MainContent = (typeof import("@/content/en"))["default"]["main"];
type ClothesContent = (typeof import("@/content/en"))["default"]["clothes"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];

interface PageProps {
  params: Promise<{ gender: string; locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { gender, locale } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";

  const { clothes: content } = await getContent<{
    clothes: ClothesContent;
  }>(locale);

  return generateCollectionPageMetadata(
    locale,
    currentGender,
    "clothes",
    content[currentGender],
  );
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const { gender } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";
  if (!hasLocale(locale)) {
    notFound();
  }
  const {
    main: fixedContent,
    clothes: content,
    productBanner,
  } = await getContent<{
    main: MainContent;
    clothes: ClothesContent;
    productBanner: ProductBannerContent;
  }>(locale);
  const { products, pageInfo } = await getClothingListByGender(currentGender);
  // `products` already matches the `GridClothes` prop structure.
  // collection?.products.nodes contains the raw Shopify product cards.
  //const productos = collection?.products.nodes ?? [];

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
        <Hero
          content={content[currentGender].hero}
          changeColor={content[currentGender].hero.changeColor}
        />
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
          content={content[currentGender].gridProducts}
          products={products}
          gender={currentGender}
          locale={locale}
          pageInfo={pageInfo}
        />
        <BestSeller content={fixedContent.bestSeller} locale={locale} />
        <Banners content={fixedContent.banners} locale={locale} />
        <ProductsBanner content={productBanner} locale={locale} />
      </main>
    </>
  );
}
