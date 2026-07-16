import Button from "@/components/ui/Button";

interface DescriptionsProps {
  product: {
    title: string;
    description: string;
    img: string;
  };
  content: {
    button: string;
  };
}
export default function Descriptions({ content, product }: DescriptionsProps) {
  return (
    <section className="container-full flex flex-col md:flex-row justify-center md:justify-start items-center py-8 md:py-20 gap-6 md:gap-35">
      <div className="flex flex-col justify-center items-start gap-8 w-full md:w-[35%] order-2 md:order-1">
        <div className="flex flex-col justify-center items-start gap-4">
          <h2 className="subtitle w-[75%]">{product.title}</h2>
          <p className="paragraph text-[#6A6A6A]">{product.description}</p>
        </div>

        <Button label={content.button} paddingX="px-6" />
      </div>
      <div className="w-full md:w-[50%] h-auto aspect-588/702 relative overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          width={588}
          height={702}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover absolute object-center inset-0"
        />
      </div>
    </section>
  );
}
