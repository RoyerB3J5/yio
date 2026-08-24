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
import { notFound } from "next/navigation";
const productCollection = [
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "Extradose ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino.webp",
    href: "#",
    gender: "men",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    gender: "women",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "Extradose ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino.webp",
    href: "#",
    gender: "men",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    gender: "women",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "Extradose ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino.webp",
    href: "#",
    gender: "men",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    gender: "women",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "Extradose ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino.webp",
    href: "#",
    gender: "men",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    gender: "women",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "Extradose ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino.webp",
    href: "#",
    gender: "men",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    gender: "women",
  },
];
type MainContent = (typeof import("@/content/en"))["default"]["main"];
type ProductBannerContent =
  (typeof import("@/content/en"))["default"]["productBanner"];
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

  //const { products } = await getFragranceListByGender();
  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--top-bar-height)">
      <Hero content={content.hero} />
      <Fashion content={content.fashion} locale={locale} />
      <Categories content={content.categories} locale={locale} />
      <Collection
        content={content.collection}
        product={productCollection}
        locale={locale}
      />
      <CollectionsCarousel content={productCollection} locale={locale} />
      <BestSeller content={content.bestSeller} locale={locale} />
      <Banners content={content.banners} locale={locale} />
      <ProductsBanner content={productBanner} locale={locale} />
    </main>
  );
}
