import Link from "next/link";
import CarouselRecommended from "./CarouselRecommended";
import { ClothingListItem } from "@/lib/shopify/transformers";

interface RecommendedItemProps {
  label: string;
  products: ClothingListItem[];
  locale?: string;
}

export default function RecommendedItem({
  label,
  products,
  locale,
}: RecommendedItemProps) {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center md:justify-between items-start py-8 lg:py-20 px-0 md:px-4  xl:pl-[calc((100%-1240px)/2)] lg:pr-0 gap-6 md:gap-0">
      <h3
        className="text-black text-[40px] md:text-[24px] lg:text-[48px] font-bold tracking-[-0.5px] leading-[100%] uppercase font-din-condensed px-4 md:px-0 fade-right"
        dangerouslySetInnerHTML={{ __html: label }}
      ></h3>
      <CarouselRecommended content={products} locale={locale} />
      {/*<div className="md:grid grid-cols-1 md:grid-cols-3 gap-1 justify-center items-start w-full md:w-[90%] lg:w-[70%] hidden ">
        {products.slice(0, 3).map((item, index) => (
          <Link
            href="#"
            className="w-full bg-white flex flex-col justify-center items-center"
            key={index}
          >
            <div className="w-full h-auto aspect-357/420 relative overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                width={357}
                height={470}
                decoding="async"
                loading="lazy"
              />
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
      </div> */}
    </section>
  );
}
