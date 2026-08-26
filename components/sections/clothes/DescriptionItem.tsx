import ProductImage from "@/components/ui/ProductImage";

interface DescriptionItemProps {
  description: {
    description: string;
    tags: {
      title: string;
      description: string[];
    }[];
  };
  images: string[];
}
export default function DescriptionItem({
  description,
  images,
}: DescriptionItemProps) {
  return (
    <section className="container-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-10 pt-8 md:pt-20">
      <div className="w-full md:w-[55%] lg:w-[48%] self-stretch flex flex-col justify-between items-start gap-5 order-2 md:order-1">
        <p className="text-[20px] lg:text-[24px] font-normal leading-[120%] text-[#6A6A6A] fade-right">
          {description.description}
        </p>
        <div className="flex flex-col justify-center items-center w-full gap-4">
          {description.tags.map((tag, index) => (
            <div
              className="w-full flex flex-col justify-center items-start gap-2 p-6 border border-[#D2D2D2] fade-right"
              key={index}
            >
              <h3 className="text-[20px] font-medium leading-[100%] uppercase font-din-condensed">
                {tag.title}
              </h3>
              <ul
                className={` ${tag.description.length > 1 ? "flex flex-col gap-1 justify-center items-start list-disc list-inside" : ""}`}
              >
                {tag.description.map((desc, index) => (
                  <li key={index} className="paragraph text-[#6A6A6A]">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[45%] lg:w-[52%] h-auto aspect-666/803 relative overflow-hidden order-1 md:order-2 group">
        <ProductImage
          src={images.at(-1) ?? ""}
          alt="Producto de YIO"
          width={666}
          height={803}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 52vw"
          className="w-full h-full object-cover transition-transform duration-1500 ease-linear group-hover:scale-115"
        />
      </div>
    </section>
  );
}
