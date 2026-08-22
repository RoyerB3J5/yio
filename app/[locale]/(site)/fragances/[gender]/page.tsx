import Banners from "@/components/sections/Banners";
import GridProducts from "@/components/sections/fragances/GridProducts";
import BestSeller from "@/components/sections/main/BestSeller";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";

// When this grid is connected to Shopify:
// import { getFragranceListByGender } from "@/lib/shopify";

const content = {
  men: {
    hero: {
      title: "Fragancias <br class='block lg:hidden'/>  Que Inspiran ",
      carouselImages: [
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
        {
          image: "/images/best-seller/hero.webp",
          color: "text-black",
        },
        {
          image: "/images/main/hero.webp",
          color: "text-white",
        },
      ],
      changeColor: true,
    },
    gridProducts: {
      title: "PRODUCTOS",
      filter1: "FILTROS",
      filter2: "ORDENAR POR",
      image1: "men-grid-1",
      image2: "men-grid-2",
    },
  },
  women: {
    hero: {
      title: "Fragancias <br class='block lg:hidden'/>  Que Inspiran ",
      carouselImages: [
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
      ],
      changeColor: false,
    },
    gridProducts: {
      title: "PRODUCTOS",
      filter1: "FILTROS",
      filter2: "ORDENAR POR",
      image1: "women-grid-1",
    },
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
    title: "alo <br/> Yoga Accolade hoodie ",
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

const productsMen = [
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
    createdAt: "2023-08-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    createdAt: "2023-08-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Purple Melancholia ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-purple.webp",
    href: "#",
    createdAt: "2023-08-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/le-labo.webp",
    href: "#",
    createdAt: "2023-02-01T00:00:00Z",
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
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Purple Melancholia ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-purple.webp",
    href: "#",
    createdAt: "2023-07-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/le-labo.webp",
    href: "#",
    createdAt: "2023-04-01T00:00:00Z",
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
    createdAt: "2023-06-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    createdAt: "2023-06-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Purple Melancholia ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-purple.webp",
    href: "#",
    createdAt: "2023-05-23T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/le-labo.webp",
    href: "#",
    createdAt: "2023-05-01T00:00:00Z",
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
    createdAt: "2023-05-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    createdAt: "2023-05-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Purple Melancholia ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-purple.webp",
    href: "#",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/le-labo.webp",
    href: "#",
    createdAt: "2023-05-01T00:00:00Z",
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
    createdAt: "2023-05-12T00:00:00Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "VALENTINO",
    category: "The Gold ",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-gold.webp",
    href: "#",
    createdAt: "2023-05-12T00:00:00Z",
  },
];
const productsWomen = [
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Donna",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-donna.webp",
    href: "#",
    createdAt: "2026-01-15T10:30:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Eau de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat.webp",
    href: "#",
    createdAt: "2026-02-20T14:15:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Extrait de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat-extrait.webp",
    href: "#",
    createdAt: "2026-03-05T09:45:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Carolina Herrera ",
    category: "good girl Very elixir ",
    info: "2.7 OZ / 80ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/carolina-herrera.webp",
    href: "#",
    createdAt: "2026-03-18T18:20:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Donna",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-donna.webp",
    href: "#",
    createdAt: "2026-04-02T11:10:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Eau de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat.webp",
    href: "#",
    createdAt: "2026-04-12T16:05:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Extrait de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat-extrait.webp",
    href: "#",
    createdAt: "2026-05-01T13:40:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Carolina Herrera ",
    category: "good girl Very elixir ",
    info: "2.7 OZ / 80ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/carolina-herrera.webp",
    href: "#",
    createdAt: "2026-05-22T08:50:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Donna",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-donna.webp",
    href: "#",
    createdAt: "2026-06-10T15:25:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Eau de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat.webp",
    href: "#",
    createdAt: "2026-06-28T19:00:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Extrait de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat-extrait.webp",
    href: "#",
    createdAt: "2026-07-04T12:35:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Carolina Herrera ",
    category: "good girl Very elixir ",
    info: "2.7 OZ / 80ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/carolina-herrera.webp",
    href: "#",
    createdAt: "2026-07-19T17:15:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "VALENTINO",
    category: "Donna",
    info: "3.4 OZ / 100ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/valentino-donna.webp",
    href: "#",
    createdAt: "2026-08-03T09:10:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Eau de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat.webp",
    href: "#",
    createdAt: "2026-08-14T21:45:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Baccarat",
    category: "Extrait de Parfum ",
    info: "2.4 OZ / 70ml",
    price: 90.0,
    rate: 4.5,
    img: "/images/products/baccarat-extrait.webp",
    href: "#",
    createdAt: "2026-08-18T10:00:00.000Z",
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "Carolina Herrera ",
    category: "good girl Very elixir ",
    info: "2.7 OZ / 80ml",
    price: 80.0,
    rate: 4.5,
    img: "/images/products/carolina-herrera.webp",
    href: "#",
    createdAt: "2026-08-21T14:30:00.000Z",
  },
];
import { content as fixedContent } from "@/content/main";

interface PageProps {
  params: Promise<{ gender: string; locale: string }>;
}
export default async function Page({ params }: PageProps) {
  const { gender, locale } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";

  // const { products } = await getFragranceListByGender(currentGender);
  // `products` already matches the `GridProducts` prop structure.
  // collection?.products.nodes contains the raw Shopify product cards.
  //const productos = collection?.products.nodes ?? [];
  return (
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

      <GridProducts
        content={content[currentGender].gridProducts}
        products={currentGender === "men" ? productsMen : productsWomen}
        gender={currentGender}
      />
      <BestSeller content={fixedContent.bestSeller} locale={locale} />
      <Banners content={fixedContent.banners} locale={locale} />
      <ProductsBanner content={productBanner} locale={locale} />
    </main>
  );
}
