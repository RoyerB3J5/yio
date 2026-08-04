import Button from "@/components/ui/Button";
import Link from "next/link";

interface HeroItemProps {
  product: {
    name: string;
    category: string;
    description: string;
    variants: {
      id: string;
      name: string;
    }[];
    rate: number;
    price: number;
    accompanies: {
      name: string;
      category: string;
      price: number;
      img: string;
    }[];
  };
  content: {
    button: string;
    estilo: string;
    recomendado: string;
  };
  images: string[];
}

export default function HeroItem({ product, content, images }: HeroItemProps) {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center items-start">
      {/* ----------------- COLUMNA IZQUIERDA: IMÁGENES (SE MUEVEN AL HACER SCROLL) ----------------- */}
      <div className="w-full md:w-[55%] lg:w-[45%] grid grid-cols-1 md:grid-cols-2 gap-1">
        {images.slice(0, 2).map((image, index) => (
          <div
            className="w-full h-auto aspect-352/528 relative overflow-hidden hidden md:block"
            key={index}
          >
            <img
              src={image}
              alt={product.name + " " + (index + 1)}
              width={352}
              height={528}
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="w-full h-auto aspect-375/562 relative overflow-hidden md:hidden block">
          <img
            src={images[0]}
            alt={product.name + " 1"}
            width={375}
            height={562}
            decoding="async"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-auto aspect-708/759 relative overflow-hidden hidden col-span-2 md:block">
          <img
            src={images[2]}
            alt={product.name + " 3"}
            width={708}
            height={759}
            decoding="async"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ----------------- COLUMNA DERECHA: CONTENIDO (STICKY) ----------------- */}
      {/* Agregamos 'md:sticky' y 'top-0' (o 'top-20' si hay un menú fijo arriba) */}
      <div className="md:sticky top-0 w-full md:w-[45%] lg:w-[55%] px-4 md:px-10 xl:pl-24 flex flex-col justify-start items-start pt-10 lg:pt-20 gap-8 md:gap-10 xl:gap-20 xl:pr-[calc((100vw-1280px)/2)]">
        <div className="w-full flex flex-col justify-center items-start gap-8">
          <div className="w-full flex flex-col justify-center items-start gap-4">
            <div className="w-full flex flex-col justify-center items-start gap-2 text-black">
              <h2 className="text-[48px] font-din-condensed leading-[100%] font-bold uppercase">
                {product.name}
              </h2>
              <h1 className="text-[48px] leading-[100%] font-normal uppercase">
                {product.category}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img
                src="/images/start.svg"
                alt="Star"
                className="w-[14px] h-[14px] text-[#151515]"
                width={14}
                height={14}
              />
              <p className="paragraph text-[#181818]">{product.rate}</p>
            </div>
            <p className="text-[14px] font-normal leading-[150%] text-[#6A6A6A] w-full xl:w-[70%]">
              {product.description}
            </p>
          </div>
          <div className="w-full flex justify-start items-center gap-4">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                className="w-12 h-8 border border-[#D2D2D2] text-[14px] font-normal leading-[150%] text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {variant.name}
              </button>
            ))}
          </div>
          <p className="title-h3 text-black">${product.price.toFixed(2)}</p>
          <Button label={content.button} wFull />
        </div>
        <div className="w-full flex flex-col justify-center items-center md:items-start gap-4">
          <h3 className="title-h3 text-black">{content.estilo}</h3>
          <div className="w-full grid grid-cols-2 gap-6 justify-center items-start">
            {product.accompanies.map((item, index) => (
              <Link
                href="#"
                className="w-full bg-white flex flex-col justify-center items-center"
                key={index}
              >
                <div className="w-full h-auto aspect-240/283 relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    width={240}
                    height={283}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-2 px-2.5 py-4.5 md:px-4 md:py-6">
                  <h3 className="title-h3">{item.name}</h3>
                  <p className="paragraph uppercase w-full xl:w-[70%]">
                    {item.category}
                  </p>
                  <p className="paragraph-bold">${item.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
