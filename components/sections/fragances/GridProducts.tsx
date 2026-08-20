import { ChevronDown, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";

interface GridProductsProps {
  content: {
    title: string;
    filter1: string;
    filter2: string;
    image1: string;
    image2?: string;
  };
  gender: string;
  products: {
    isNew: boolean;
    isBestSeller: boolean;
    name: string;
    category: string;
    info: string;
    price: number;
    rate: number;
    img: string;
    href: string;
  }[];
}
export default function GridProducts({
  content,
  products,
  gender,
}: GridProductsProps) {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-12  py-12">
      <div className="container-full flex justify-between items-center py-3 text-black">
        <button className="flex justify-center items-center gap-2">
          <SlidersHorizontal className="w-6 h-6" />
          {content.filter1}
        </button>
        <h3 className="paragraph uppercase hidden md:block">
          {products.length} {content.title}
        </h3>
        <button className="flex justify-center items-center gap-2">
          {content.filter2}
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1 grid-flow-dense">
        {/* IMAGEN 1: Fila 3 y 4, Columna 3 y 4 (Ocupa 2x2 bloques del grid) */}
        <div className="hidden lg:block lg:col-start-3 lg:row-start-2 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px]">
          <img
            src={`/images/fragances/${content.image1}.webp`}
            alt="Banner Promocional 1"
            className="w-full h-full object-cover"
            width={800}
            height={800}
            decoding="async"
            loading="lazy"
          />
        </div>

        {/* IMAGEN 2: Fila 6 y 7, Columna 1 y 2 (Ocupa 2x2 bloques del grid) */}
        {gender === "men" && (
          <div className="hidden lg:block lg:col-start-1 lg:row-start-5 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px]">
            <img
              src={`/images/fragances/${content.image2}.webp`}
              alt="Banner Promocional 2"
              width={800}
              height={800}
              className="w-full h-full object-cover object-center"
              decoding="async"
              loading="lazy"
            />
          </div>
        )}

        {products.map((item, index) => (
          <Link
            href="men/le-male"
            className="w-full bg-[#F8F7F3] flex flex-col justify-between items-center aspect-357/484 px-2.5 py-4.5 md:p-4"
            key={index}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-start gap-2">
                {item.isNew && (
                  <div className="py-2 px-1 md:px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                    New
                  </div>
                )}
                {item.isBestSeller && (
                  <div className="py-2 px-1 md:px-4 bg-[#181818] paragraph-xs text-white uppercase">
                    Best Seller
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  src="/images/start.svg"
                  alt="Star"
                  className="w-[14px] h-[14px] text-[#151515]"
                  width={14}
                  height={14}
                />
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
    </section>
  );
}
