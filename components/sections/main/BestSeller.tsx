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
  locale: string;
}

export default function BestSeller({ content, locale }: BestSellerProps) {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-6 pb-8 md:pb-20 lg:pt-20">
      <div className="w-full px-4 md:px-8 lg:px-16 flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
        <h2 className="subtitle text-black fade-right">{content.title}</h2>
        <p className="text-[#6A6A6A] paragraph uppercase fade-right">
          {content.description}
        </p>
        <div className="flex justify-center items-center gap-2 fade-right">
          {content.category.map((item, index) => (
            <Button
              key={index}
              label={item.name}
              href={`/${locale}${item.href}`}
            />
          ))}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-4 items-start lg:items-center justify-center ">
        {content.collections.map((item, index) => (
          <div
            className="flex flex-col justify-center items-center gap-4 h-full fade-up"
            style={{ transitionDelay: `${index * 0.1}s` }}
            key={index}
          >
            <div className="w-full aspect-357/400 relative h-auto overflow-hidden group">
              <img
                src={`/images/main/${item.image}.webp`}
                alt={item.name}
                width="500"
                height="408"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-1500 ease-linear group-hover:scale-115"
              />
            </div>
            <div className="flex flex-col jusitfy-start md:justify-center items-center gap-2 text-center px-1 grow">
              <h3
                className="title-h3  text-black"
                dangerouslySetInnerHTML={{ __html: item.name }}
              ></h3>
              <p
                className="text-[#6A6A6A] paragraph w-full md:w-[90%] lg:w-full grow"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <a href={`/${locale}${item.href}`} className="link-style">
                <p>{item.label}</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
