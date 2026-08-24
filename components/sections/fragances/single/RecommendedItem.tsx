import CarouselRecommended from "./CarouselRecommended";

interface RecommendedItemProps {
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

export default function RecommendedItem({
  label,
  products,
}: RecommendedItemProps) {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center md:justify-between items-start py-8 lg:py-20 px-0 md:px-4  xl:pl-[calc((100%-1240px)/2)] lg:pr-0 gap-6 md:gap-0">
      <h3
        className="text-black text-[40px] md:text-[24px] lg:text-[48px] font-bold tracking-[-0.5px] leading-[100%] uppercase font-din-condensed px-4 md:px-0"
        dangerouslySetInnerHTML={{ __html: label }}
      ></h3>
      <CarouselRecommended content={products} />
    </section>
  );
}
