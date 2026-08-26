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
    recomendado: string;
    tag: string;
  };
}

export default function Information({ product, content }: InformationProps) {
  return (
    <section className="w-full  bg-[#CAD6F2] flex justify-center items-center">
      <div className='container-full flex flex-col justify-center items-center py-8 md:py-20 gap-10 md:gap-12'>
        <div className="flex flex-col justify-center items-center gap-6 text-black px-4 md:px-0">
          <p className="title-h3 fade-up">{content.tag}</p>
          <h2 className="title-banner w-[70%] md:w-full text-center fade-up">
            {product.title}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="w-full md:w-[50%] h-auto aspect-588/702 relative overflow-hidden group md:max-w-[50%]">
            <img
              src={product.img}
              alt={product.title}
              width={588}
              height={702}
              className="w-full h-full object-cover inset-0 object-center absolute transition-transform duration-1500 ease-linear group-hover:scale-115"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-8 w-full md:w-[50%] px-4 md:px-0">
            <div className="flex flex-col justify-center items-start gap-4">
              <h2 className="subtitle fade-left">{product.subtitle}</h2>
              <p className="paragraph text-[#6A6A6A] fade-left">
                {product.description}
              </p>
            </div>
            <Button label={content.button} paddingX="px-6 fade-left" />
          </div>
        </div>
      </div>
    </section>
  );
}
