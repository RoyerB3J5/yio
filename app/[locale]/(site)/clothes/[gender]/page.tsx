import Banners from "@/components/sections/Banners";
import GridClothes from "@/components/sections/clothes/GridClothes";
import BestSeller from "@/components/sections/main/BestSeller";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";

// When this grid is connected to Shopify:
// import { getClothingListByGender } from "@/lib/shopify";

const content = {
  men: {
    hero: {
      title: "MODA <br class='block md:hidden'/> EXCLUSIVA",
      carouselImages: [
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
        {
          image: "/images/fragances/women-hero.webp",
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
  },
  women: {
    hero: {
      title: "MODA EXCLUSIVA",
      carouselImages: [
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
        {
          image: "/images/fragances/women-hero.webp",
          color: "text-white",
        },
        {
          image: "/images/clothes/men-hero.webp",
          color: "text-black",
        },
      ],
      changeColor: false,
    },
    gridProducts: {
      title: "PRODUCTOS",
      filter1: "FILTROS",
      filter2: "ORDENAR POR",
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
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade hoodie ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-2.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "ALO",
    category: "Yoga Accolade Crew Neck Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-3.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade hoodie ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-2.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "ALO",
    category: "Yoga Accolade Crew Neck Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-3.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade hoodie ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-2.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "ALO",
    category: "Yoga Accolade Crew Neck Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/men-3.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
];
const productsWomen = [
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade hoodie ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-2.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "ALO",
    category: "Yoga Accolade Crew Neck Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-3.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade hoodie ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-2.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: false,
    name: "ALO",
    category: "Yoga Accolade Crew Neck Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-3.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-1.webp",
    href: "#",
    variants: [
      {
        id: "s",
        name: "S",
      },
      {
        id: "m",
        name: "M",
      },
      {
        id: "l",
        name: "L",
      },
    ],
  },
];
import { content as fixedContent } from "@/content/main";

interface PageProps {
  params: Promise<{ gender: string; locale: string }>;
}
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const { gender } = await params;
  const currentGender = gender === "women" || gender === "men" ? gender : "men";

  // const { products } = await getClothingListByGender(currentGender);
  // `products` already matches the `GridClothes` prop structure.
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

      <GridClothes
        content={content[currentGender].gridProducts}
        products={currentGender === "men" ? productsMen : productsWomen}
      />
      <BestSeller content={fixedContent.bestSeller} locale={locale} />
      <Banners content={fixedContent.banners} locale={locale} />
      <ProductsBanner content={productBanner} locale={locale} />
    </main>
  );
}
