import Banners from "@/components/sections/Banners";
import GridClothes from "@/components/sections/clothes/GridClothes";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";

const content = {
  hero: {
    title: "BEST SELLERS",
    image: "/images/best-seller/hero.webp",
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

const products = [
  {
    isNew: true,
    isBestSeller: true,
    name: "nike",
    category: "AirForce 1 Black",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-1.webp",
    href: "#",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
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
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
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
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "apple",
    category: "AirPods Pro 2 generation",
    price: 70.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-2.webp",
    href: "#",
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "LE LABO",
    category: "Santal 33 ",
    price: 80.0,
    rate: 4.5,
    img: "/images/best-seller/bestseller-3.webp",
    href: "#",
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
  },
];

import { content as fixedContent } from "@/content/main";

export default async function Page() {
  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--top-bar-height)">
      <Hero content={content.hero} changeColor={content.hero.changeColor} />
      <GridClothes content={content.gridProducts} products={products} />
      <Banners content={fixedContent.banners} />
      <ProductsBanner content={productBanner} />
    </main>
  );
}
