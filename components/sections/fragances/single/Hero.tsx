"use client";

import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";

interface HeroProps {
  productInfo: {
    image: string;
    infoProduct: {
      isNew: boolean;
      name: string;
      category: string;
      info: string;
      price: number;
      rate: number;
      img: string;
      idVariant: string;
    };
  };
  content: {
    button: string;
  };
}
export default function Hero({ productInfo, content }: HeroProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const handleAddToCart = async () => {
    await addItem(productInfo.infoProduct.idVariant, 1);
  };

  return (
    <section className="w-full flex flex-col md:flex-row justify-center items-center h-[calc(100vh-var(--header-height))] md:h-[50vh] xl:h-[calc(100vh-var(--header-height))]">
      <div className="w-full md:w-[60%] h-auto md:h-full relative overflow-hidden aspect-375/358 md:aspect-auto group">
        <img
          src={productInfo.image}
          alt={productInfo.infoProduct.name}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-1500 ease-linear group-hover:scale-115 "
          width="875"
          height="695"
          decoding="async"
          loading="eager"
        />
      </div>
      <div className="w-full md:w-[40%] h-full flex flex-col justify-center items-center gap-6 px-10 bg-[#CAD6F2]">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-start fade-right">
            {productInfo.infoProduct.isNew && (
              <div className="py-2 px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                New
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 fade-left">
            <img
              src="/images/start.svg"
              alt="Star"
              className="w-[14px] h-[14px] text-[#151515]"
              width={14}
              height={14}
            />
            <p className="paragraph text-[#181818]">
              {productInfo.infoProduct.rate}
            </p>
          </div>
        </div>
        <img
          src={productInfo.infoProduct.img}
          alt={productInfo.infoProduct.name}
          className="w-[40%] h-auto fade-up"
          width={203}
          height={270}
          decoding="async"
          loading="eager"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-1 text-black">
            <h3 className="title-h3 fade-up">{productInfo.infoProduct.name}</h3>
            <p className="title-h2 uppercase fade-up">
              {productInfo.infoProduct.category}
            </p>
            <p className="paragraph uppercase fade-up">
              {productInfo.infoProduct.info}
            </p>
          </div>
          <p className="paragraph-price fade-up">
            ${productInfo.infoProduct.price.toFixed(2)}
          </p>
        </div>
        <Button label={content.button} paddingX="px-6 fade-up" onClick={handleAddToCart} disabled={isLoading} />
      </div>
    </section>
  );
}
