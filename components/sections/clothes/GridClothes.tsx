import { ChevronDown, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";

interface GridProductsProps {
  content: {
    title: string;
    filter1: string;
    filter2: string;
  };
  products: {
    isNew: boolean;
    isBestSeller: boolean;
    name: string;
    category: string;
    price: number;
    rate: number;
    img: string;
    href: string;
    variants?: {
      id: string;
      name: string;
    }[];
  }[];
}
export default function GridProducts({ content, products }: GridProductsProps) {
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
        {products.map((item, index) => (
          <Link
            href="men/1"
            className="w-full bg-white flex flex-col justify-center items-center"
            key={index}
          >
            <div className="w-full h-auto aspect-357/420 relative overflow-hidden flex items-end group transition-all duration-300 ease-in-out">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover absolute inset-0 object-center z-0"
                width={357}
                height={470}
                decoding="async"
                loading="lazy"
              />
              <div className="group-hover:flex justify-center items-center gap-2 hidden transition-all duration-300 ease-in-out z-10 relative w-full px-4 flex-wrap pb-4">
                {item.variants &&
                  item.variants.map((variant, index) => (
                    <button
                      className="bg-white px-6 py-2 border border-black flex justify-center items-center paragraph text-black uppercase cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                      key={index}
                    >
                      {variant.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4 px-2.5 py-4.5 md:p-4">
              <div className="flex justify-center items-start gap-2">
                {item.isNew && (
                  <div className="py-2 px-1 md:px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                    New
                  </div>
                )}
                {item.isBestSeller && (
                  <div className="py-2 px-1 md:px-4 bg-[#181818] paragraph-xs text-white uppercase ">
                    Best Seller
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-start gap-2 text-black w-full">
                <div className="flex justify-between items-center w-full">
                  <h3 className="title-h3">{item.name}</h3>
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
                <p className="paragraph uppercase">{item.category}</p>
                <p className="paragraph-bold">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
