import Banners from "@/components/sections/Banners";
import GridClothes from "@/components/sections/clothes/GridClothes";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";
import type { ClothingListItem, FragranceListItem } from "@/lib/shopify/transformers";

type ProductItem = ClothingListItem | FragranceListItem;

const content = {
  hero: {
    title: "BEST SELLERS",
    carouselImages: [
      {
        image: "/images/best-seller/hero.webp",
        color: "text-black",
      },
      {
        image: "/images/main/hero.webp",
        color: "text-white",
      },
      {
        image: "/images/fragances/men-hero.webp",
        color: "text-black",
      },
      {
        image: "/images/fragances/women-hero.webp",
        color: "text-white",
      },
      {
        image: "/images/clothes/men-hero.webp",
        color: "text-black",
      },
      {
        image: "/images/clothes/women-hero.webp",
        color: "text-white",
      },
    ],
    changeColor: true,
  },
  gridProducts: {
    title: "PRODUCTOS",
    filter1: "FILTROS",
    filter2: "ORDENAR POR",
  },
};
const productBanner = [
  {
    title: "Jean Paul Gaultier <br/>Le Male ",
    description:
      "Le Male, tan viril como sexy, rinde homenaje a la figura simbólica que siempre ha inspirado a Jean Paul Gaultier: el marinero.Este perfume masculino tiene una visión inconformista de la masculinidad. La lavanda, que evoca el familiar y reconfortante aroma de la espuma de afeitar, se ve realzada por la sensualidad de la vainilla.",
    button: {
      label: "comprar",
      link: "#",
    },
    image: "/images/products/jean-paul.webp",
  },
  {
    title: "Dior <br/> sauvage ",
    description:
      "Sauvage se ha convertido en un nombre inconfundible en el ámbito del perfume para hombre. Disponible en eau de toilette, eau de parfum, parfum —recargables— o elixir, Sauvage despliega fragancias características que combinan frescura, potencia y nobleza.",
    button: {
      label: "comprar",
      link: "#",
    },
    image: "/images/products/dior-savage.webp",
  },
  {
    title: "alo <br class='hidden xl:block'/> Yoga Accolade hoodie ",
    description:
      "A todo el mundo le encanta la colección Accolade. Nuestra sudadera con capucha más vendida presenta un diseño informal con hombros caídos para un estilo impecable en el estudio de yoga y para salir a la calle, un bolsillo de canguro de gran tamaño, y un cómodo acanalado en los puños y el dobladillo. Se ha confeccionado con felpa francesa de peso medio con caída, suave por fuera y con forro polar por dentro. Sácale el máximo partido con el pantalón de chándal Accolade a juego. Encuentra el ajuste perfecto y descubre todas las formas de lucirlo.",
    button: {
      label: "comprar",
      link: "#",
    },
    image: "/images/products/alo-hoddie.webp",
  },
  {
    title: "Essentials <br/> hoodie  ",
    description:
      "Los hoodies de Essentials (de la marca Fear of God) son prendas urbanas premium. Destacan por su estilo minimalista, corte holgado (oversize) y tejido grueso (algodón afelpado). Ofrecen máxima comodidad y se volvieron un básico de lujo muy popular",
    button: {
      label: "comprar",
      link: "#",
    },
    image: "/images/products/essentials-hoddie.webp",
  },
];

const products: ProductItem[] = [
  {
    isNew: true,
    isBestSeller: true,
    name: "nike",
    category: "AirForce 1 Black",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-1.webp",
    href: "#",
    createdAt: "2026-01-14T08:20:00.000Z",
    variants: [
      {
        id: "1",
        name: "36",
        availableForSale: true,
      },
      {
        id: "2",
        name: "38",
        availableForSale: true,
      },
      {
        id: "3",
        name: "40",
        availableForSale: true,
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    info: "AirPods Pro 2 generation",
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
    createdAt: "2026-02-05T14:10:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    info: "Santal 33 ",
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
    createdAt: "2026-02-28T19:45:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "nike",
    category: "AirForce 1 Black",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-1.webp",
    href: "#",
    createdAt: "2026-03-12T11:30:00.000Z",
    variants: [
      {
        id: "1",
        name: "36",
        availableForSale: true,
      },
      {
        id: "2",
        name: "38",
        availableForSale: true,
      },
      {
        id: "3",
        name: "40",
        availableForSale: true,
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    info: "AirPods Pro 2 generation",
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
    createdAt: "2026-04-01T16:05:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    info: "Santal 33 ",
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
    createdAt: "2026-04-18T09:15:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "nike",
    category: "AirForce 1 Black",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-1.webp",
    href: "#",
    createdAt: "2026-05-22T13:50:00.000Z",
    variants: [
      {
        id: "1",
        name: "36",
        availableForSale: true,
      },
      {
        id: "2",
        name: "38",
        availableForSale: true,
      },
      {
        id: "3",
        name: "40",
        availableForSale: true,
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    info: "AirPods Pro 2 generation",
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
    createdAt: "2026-06-10T10:25:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    info: "Santal 33 ",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
    createdAt: "2026-07-04T18:40:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "nike",
    category: "AirForce 1 Black",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-1.webp",
    href: "#",
    createdAt: "2026-08-15T21:00:00.000Z",
    variants: [
      {
        id: "1",
        name: "36",
        availableForSale: true,
      },
      {
        id: "2",
        name: "38",
        availableForSale: true,
      },
      {
        id: "3",
        name: "40",
        availableForSale: true,
      },
    ],
  },
];

import { content as fixedContent } from "@/content/main";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--top-bar-height)">
      <Hero content={content.hero} changeColor={content.hero.changeColor} />
      <GridClothes content={content.gridProducts} products={products} />
      <Banners content={fixedContent.banners} locale={locale} />
      <ProductsBanner content={productBanner} locale={locale} />
    </main>
  );
}
