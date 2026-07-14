import Button from "@/components/ui/Button";

interface InformationProps {
  product: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    img: string;
  };
  content: {
    button: string;
  };
}

export default function Information({ product, content }: InformationProps) {
  return (
    <section className="w-full flex flex-col justify-center items-center py-20 gap-12 bg-[#CAD6F2]">
      <div className="flex flex-col justify-center items-center gap-6 text-black">
        <p className="title-h3">{product.tag}</p>
        <h2 className="title-banner">{product.title}</h2>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="w-[60%] h-auto aspect-588/702 relative overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            width={588}
            height={702}
            className="w-full h-full object-cover inset-0 object-center absolute"
            decoding="async"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-8 w-[50%]">
          <div className="flex flex-col justify-center items-start gap-4">
            <h2 className="subtitle ">{product.subtitle}</h2>
            <p className="paragraph text-[#6A6A6A]">{product.description}</p>
          </div>
          <Button label={content.button} paddingX="px-6" />
        </div>
      </div>
    </section>
  );
}
