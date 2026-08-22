import { Star } from "lucide-react";
import Link from "next/link";

interface CollectionProps {
  content: {
    title: string;
    description: string;
  };
  locale: string;
  product: {
    isNew: boolean;
    isBestSeller: boolean;
    name: string;
    gender?: string;
    category: string;
    info: string;
    price: number;
    rate: number;
    img: string;
    href: string;
  }[];
}
export default function Collection({
  content,
  product,
  locale,
}: CollectionProps) {
  return (
    <section className="w-full py-8 md:py-20 flex justify-center items-center flex-col gap-6">
      <div className="aspect-718/972 w-full h-auto relative md:hidden block">
        <img
          src={"/images/main/collection.webp"}
          alt={"Collection YIO Fragance"}
          width={718}
          height={972}
          className="w-full h-full object-cover object-center absolute inset-0"
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 text-center px-4 md:px-0">
        <h2 className="subtitle text-black">{content.title}</h2>
        <p className="paragraph uppercase text-[#6A6A6A]">
          {content.description}
        </p>
      </div>
      <div className="w-full hidden md:flex justify-center items-start gap-1 relative">
        {/* ----------------- COLUMNA IZQUIERDA (STICKY) ----------------- */}
        {/* Agregamos 'sticky' y 'top-0' (o 'top-20' si tienes un header fijo) */}
        <div className="sticky top-0 w-1/2 h-auto aspect-718/972 relative overflow-hidden">
          <img
            src={"/images/main/collection.webp"}
            alt={"Collection YIO Fragance"}
            width={718}
            height={972}
            className="w-full h-full object-cover object-center absolute inset-0"
            decoding="async"
            loading="lazy"
          />
        </div>

        {/* ----------------- COLUMNA DERECHA (GRID DE PRODUCTOS) ----------------- */}
        <div className="w-full md:w-1/2 md:grid grid-cols-2 gap-1 justify-center items-center hidden">
          {product.map((item, index) => (
            <Link
              href={`/${locale}/fragances/${item.gender}/${item.href}`}
              className="w-full bg-[#F8F7F3] flex flex-col justify-between items-center p-4 aspect-357/484"
              key={index}
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-center items-start gap-2">
                  {item.isNew && (
                    <div className="py-2 px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                      New
                    </div>
                  )}
                  {item.isBestSeller && (
                    <div className="py-2 px-4 bg-[#181818] paragraph-xs text-white uppercase hidden lg:block">
                      Best Seller
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Star className="w-[14px] h-[14px] bg-[#151515]" />
                  <p className="paragraph text-[#181818]">{item.rate}</p>
                </div>
              </div>
              <img
                src={item.img}
                alt={item.name}
                className="w-[55%] h-auto"
                width={203}
                height={270}
                decoding="async"
                loading="lazy"
              />
              <div className="w-full flex justify-between items-end">
                <div className="flex flex-col justify-center items-start gap-1 text-black">
                  <h3 className="title-h3">{item.name}</h3>
                  <p className="paragraph uppercase">{item.category}</p>
                  <p className="paragraph uppercase">{item.info}</p>
                </div>
                <p className="paragraph-bold">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
