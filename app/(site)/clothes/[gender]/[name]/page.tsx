import Banners from "@/components/sections/Banners";
import CarouselRecommended from "@/components/sections/clothes/CarouselRecommended";
import DescriptionItem from "@/components/sections/clothes/DescriptionItem";
import HeroItem from "@/components/sections/clothes/HeroItem";
import RecommendedItem from "@/components/sections/clothes/RecommendedItem";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { content as fixedContent } from "@/content/main";
interface PageProps {
  params: Promise<{ name: string }>;
}
const content = {
  button: "Comprar ahora",
  estilo: "Acopla tu Estilo",
  recomendado:
    "Encuentra tu <br /> siguiente <br class='hidden md:block'/> favorito.",
};
const productInfo = {
  hero: {
    name: "alo",
    category: "Yoga Accolade hoodie ",
    description:
      "La sudadera Accolade combina un estilo relajado y premium con felpa francesa ultrasuave, ideal para el día a día y para crear el conjunto perfecto con el pantalón a juego.",
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
    rate: 4.5,
    price: 60.0,
    accompanies: [
      {
        name: "alo",
        category: "Yoga Accolade Crew Neck Pullover ",
        price: 60.0,
        img: "/images/clothes/women-2.webp",
      },
      {
        name: "alo",
        category: "Yoga accolade straight leg sweatpants ",
        price: 60.0,
        img: "/images/clothes/alo-pants.webp",
      },
    ],
  },
  images: [
    "/images/clothes/women-3.webp",
    "/images/clothes/alo-hoddie/alo-hoddie-1.webp",
    "/images/clothes/alo-hoddie/alo-hoddie-2.webp",
    "/images/clothes/alo-hoddie/alo-hoddie-3.webp",
  ],
  information: {
    description:
      "Descubre la combinación perfecta de suavidad, confort y un estilo relajado que nunca pasa de moda.",
    tags: [
      {
        title: "DEScripción",
        description: [
          "A todo el mundo le encanta la colección Accolade. Nuestra sudadera con capucha más vendida presenta un diseño informal con hombros caídos para un estilo impecable en el estudio de yoga y para salir a la calle, un bolsillo de canguro de gran tamaño, y un cómodo acanalado en los puños y el dobladillo. Se ha confeccionado con felpa francesa de peso medio con caída, suave por fuera y con forro polar por dentro. Sácale el máximo partido con el pantalón de chándal Accolade a juego. Encuentra el ajuste perfecto y descubre todas las formas de lucirlo.",
        ],
      },
      {
        title: "ajuste",
        description: [
          "Modelo unisex",
          "Diseño para un estilo extragrande y cuadrado. Opta por una talla menos si prefieres un ajuste más estrecho.",
        ],
      },
      {
        title: "fabricación",
        description: [
          "Felpa francesa suave por fuera y con forro polar por dentro",
          "65% algodón y 35% poliéster",
          "Lavar a máquina por separado, en frío y con ciclo suave. Utilizar un ciclo de secado a máquina suave a temperatura baja.",
        ],
      },
    ],
  },
};

const productRecommended = [
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga Accolade 1/4 Pullover ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/women-1.webp",
    href: "#",
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
  },
  {
    isNew: true,
    isBestSeller: true,
    name: "ALO",
    category: "Yoga accolade straight leg sweatpants ",
    price: 60.0,
    rate: 4.5,
    img: "/images/clothes/alo-pants.webp",
    href: "#",
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
export default async function SingleFragrance({ params }: PageProps) {
  const { name } = await params;
  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--header-height)">
      <HeroItem
        product={productInfo.hero}
        content={content}
        images={productInfo.images}
      />
      <DescriptionItem
        description={productInfo.information}
        images={productInfo.images}
      />
      <RecommendedItem
        label={content.recomendado}
        products={productRecommended}
      />
      <CarouselRecommended content={productRecommended} />
      <Banners content={fixedContent.banners} />
      <ProductsBanner content={productBanner} />
    </main>
  );
}
