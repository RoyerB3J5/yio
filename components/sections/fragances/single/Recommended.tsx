import Link from "next/link";

interface RecommendedProps {
  label: string;
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

export default function Recommended({ label, products }: RecommendedProps) {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center md:justify-between items-start py-8 md:py-20 px-4  xl:pl-[calc((100%-1240px)/2)] lg:pr-0 gap-6 md:gap-0">
      <h3
        className="text-black text-[40px] md:text-[24px] lg:text-[48px] font-bold tracking-[-0.5px] leading-[100%] uppercase font-din-condensed"
        dangerouslySetInnerHTML={{ __html: label }}
      ></h3>
      <div className="md:grid grid-cols-1 md:grid-cols-3 gap-1 justify-center items-start w-full md:w-[90%] lg:w-[70%] hidden ">
        {products.slice(0, 3).map((item, index) => (
          <Link
            href="#"
            className="w-full bg-[#F8F7F3] flex flex-col justify-center items-center gap-10 p-4"
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
              className="w-[65%] h-auto"
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
