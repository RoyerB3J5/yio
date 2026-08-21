import Banners from "@/components/sections/Banners";
import Descriptions from "@/components/sections/fragances/single/Descriptions";
import Hero from "@/components/sections/fragances/single/Hero";
import Information from "@/components/sections/fragances/single/Information";
import Recommended from "@/components/sections/fragances/single/Recommended";
import CollectionsCarousel from "@/components/sections/main/CollectionsCarousel";
import ProductsBanner from "@/components/sections/ProductsBanner";
import { content as fixedContent } from "@/content/main";

// When this product page is connected to Shopify:
//import { getFragranceProductPage } from "@/lib/shopify";

interface PageProps {
  params: Promise<{ gender: string; name: string; locale: string }>;
}
const content = {
  button: "Comprar ahora",
  recomendado:
    "Encuentra tu <br /> siguiente <br class='hidden md:block'/> favorito.",
};
const productInfo = {
  section1: {
    image: "/images/fragances/single/image-1.webp",
    infoProduct: {
      isNew: true,
      name: "Jean Paul Gaultier",
      category: "Le Male",
      info: "3.4 OZ / 125ml",
      price: 90.0,
      rate: 4.5,
      img: "/images/fragances/single/image-2.webp",
    },
  },
  section2: {
    title: "Le Male Eau de Toilette",
    description:
      "Le Male, tan viril como sexy, rinde homenaje a la figura mítica que siempre ha inspirado a Jean Paul Gaultier: el marinero. Este perfume masculino tiene una visión poco convencional de la masculinidad. La lavanda, que hace referencia al olor familiar y tranquilizador del jabón de afeitar, se realza con la sensualidad de la vainilla.",
    img: "/images/fragances/single/image-3.webp",
  },
  section3: [
    "/images/fragances/single/image-4.webp",
    "/images/fragances/single/image-5.webp",
  ],
  section4: {
    tag: "NOTAS ALTAS- NOTAS DEL CORAZÓN- NOTAS BÁSICAS",
    title: "Menta. Lavanda. Vainilla",
    subtitle: "Ámbar aromático",
    description:
      "El poder y la frescura de la menta. La lavanda, que evoca el aroma familiar y reconfortante del jabón de afeitar, se transforma en la sensualidad de la vainilla",
    img: "/images/fragances/single/image-6.webp",
  },
};

const productRecommended = [
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
  const { name, locale } = await params;

  //const product = await getFragranceProductPage(name);
  // product contains the raw Shopify fragrance detail data.

  return (
    <main className="w-full flex flex-col justify-center items-center pt-(--header-height)">
      <Hero productInfo={productInfo.section1} content={content} />
      {/*<pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full block">
        <code>
          {JSON.stringify(
            product,
            (key, value) =>
              typeof value === "bigint" ? value.toString() : value,
            2,
          )}
        </code>
      </pre> */}

      <Descriptions product={productInfo.section2} content={content} />
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {productInfo.section3.map((image, index) => (
          <div
            key={index}
            className="w-full h-auto aspect-708/955 relative overflow-hidden"
          >
            <img
              src={image}
              alt={`${productInfo.section2.title} ${index + 1}`}
              width={708}
              height={955}
              className="w-full h-full object-cover absolute object-center inset-0"
              decoding="async"
              loading="lazy"
            />
          </div>
        ))}
      </section>
      <Information product={productInfo.section4} content={content} />
      <Recommended label={content.recomendado} products={productRecommended} />
      <CollectionsCarousel content={productRecommended} locale={locale} />
      <Banners content={fixedContent.banners} locale={locale} />
      <ProductsBanner content={productBanner} locale={locale} />
    </main>
  );
}
