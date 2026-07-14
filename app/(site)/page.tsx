import Banners from "@/components/sections/Banners";
import BestSeller from "@/components/sections/main/BestSeller";
import Categories from "@/components/sections/main/Categories";
import Collection from "@/components/sections/main/Collection";
import CollectionsCarousel from "@/components/sections/main/CollectionsCarousel";
import Fashion from "@/components/sections/main/Fashion";
import Hero from "@/components/sections/main/Hero";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { content } from "@/content/main";

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
  },
];
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
export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--top-bar-height)">
      <Hero content={content.hero} />
      <Fashion content={content.fashion} />
      <Categories content={content.categories} />
      <Collection content={content.collection} product={productCollection} />
      <CollectionsCarousel content={productCollection} />
      <BestSeller content={content.bestSeller} />
      <Banners content={content.banners} />
      <ProductsBanner content={productBanner} />
    </main>
  );
}
