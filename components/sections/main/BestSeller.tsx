import Button from "@/components/ui/Button";

interface BestSellerProps {
  content: {
    title: string;
    description: string;
    category: {
      name: string;
      href: string;
    }[];
    collections: {
      image: string;
      name: string;
      href: string;
      description: string;
      label: string;
    }[];
  };
}

export default function BestSeller({ content }: BestSellerProps) {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-6 pb-8 md:pb-20">
      <div className="container-full flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
        <h2 className="subtitle text-black">{content.title}</h2>
        <p className="text-[#6A6A6A] paragraph uppercase">
          {content.description}
        </p>
        <div className="flex justify-center items-center gap-2">
          {content.category.map((item, index) => (
            <Button key={index} label={item.name} href={item.href} />
          ))}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-4 items-start lg:items-center justify-center ">
        {content.collections.map((item, index) => (
          <div
            className="flex flex-col justify-center items-center gap-4"
            key={index}
          >
            <div className="w-full aspect-357/400 relative h-auto overflow-hidden">
              <img
                src={`/images/main/${item.image}.webp`}
                alt={item.name}
                width="500"
                height="408"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <h3 className="title-h3  text-black">{item.name}</h3>
              <p
                className="text-[#6A6A6A] paragraph w-full md:w-[90%] lg:w-full"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <a href={item.href} className="link-style">
                <p>{item.label}</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
