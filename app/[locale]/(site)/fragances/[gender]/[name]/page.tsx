import Banners from "@/components/sections/Banners";
import Descriptions from "@/components/sections/fragances/single/Descriptions";
import Hero from "@/components/sections/fragances/single/Hero";
import Information from "@/components/sections/fragances/single/Information";
import ProductsBanner from "@/components/sections/ProductsBanner";
import RecommendedItem from "@/components/sections/fragances/single/RecommendedItem";
import { getContent } from "@/i18n/content";
import { hasLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import {
  getFragranceProductPage,
  getRecommendedFragrance,
} from "@/lib/shopify";
import type { Metadata } from "next";
import {
  generateProductPageMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";
import type { FragranceProductPage } from "@/lib/shopify/transformers";
import ProductImage from "@/components/ui/ProductImage";

type MainContent = (typeof import("@/content/en"))["default"]["main"];
type IndividualFragancesContent =
  (typeof import("@/content/en"))["default"]["individualFragrance"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];

interface PageProps {
  params: Promise<{ gender: string; name: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name, locale } = await params;
  const product = await getFragranceProductPage(name);
  if (!product) {
    return generateProductPageMetadata(
      locale,
      {} as FragranceProductPage,
      `/${locale}/fragances`,
      [],
    );
  }
  const path = `/${locale}/fragances/${product.section1.infoProduct.gender ?? "men"}/${name}`;
  return generateProductPageMetadata(locale, product, path, product.section3);
}

export default async function SingleFragrance({ params }: PageProps) {
  const { name, locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const {
    main: fixedContent,
    individualFragrance: content,
    productBanner,
  } = await getContent<{
    main: MainContent;
    individualFragrance: IndividualFragancesContent;
    productBanner: ProductBannerContent;
  }>(locale);
  const product = await getFragranceProductPage(name);
  const { products: recommendedProducts } = await getRecommendedFragrance({
    first: 4,
  });
  if (!product || !recommendedProducts) {
    notFound();
  }
  // product contains the raw Shopify fragrance detail data.

  const path = `/${locale}/fragances/${product.section1.infoProduct.gender ?? "men"}/${name}`;
  const productJsonLd = generateProductJsonLd(
    product,
    path,
    locale,
    product.section3,
    product.section1.infoProduct.price,
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `/${locale}` },
    {
      name: "Fragrances",
      url: `/${locale}/fragances/${product.section1.infoProduct.gender ?? "men"}`,
    },
    {
      name: `${product.section1.infoProduct.name} ${product.section1.infoProduct.category}`,
      url: path,
    },
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
        <Hero productInfo={product.section1} content={content} />
        {/* <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full block">
          <code>
            {JSON.stringify(
              product,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2,
            )}
          </code>
        </pre>*/}
        <Descriptions product={product.section2} content={content} />
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.section3.map((image, index) => (
            <div
              key={index}
              className={`w-full h-auto aspect-708/955 relative overflow-hidden group ${index === 0 ? "fade-right" : "fade-left"}`}
            >
              <ProductImage
                src={image}
                alt={`${product.section2.title} ${index + 1}`}
                width={708}
                height={955}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover absolute object-center inset-0 transition-transform duration-1500 ease-linear group-hover:scale-115"
              />
            </div>
          ))}
        </section>
        <Information product={product.section4} content={content} />
        <RecommendedItem
          label={content.recomendado}
          products={recommendedProducts}
          locale={locale}
        />
        <Banners content={fixedContent.banners} locale={locale} />
        <ProductsBanner content={productBanner} locale={locale} />
      </main>
    </>
  );
}
