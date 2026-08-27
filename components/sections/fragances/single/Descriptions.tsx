"use client";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import { useCartStore } from "@/store/cart";

interface DescriptionsProps {
  product: {
    title: string;
    description: string;
    img: string;
  };
  content: {
    button: string;
  };
  variantId: string;
}
export default function Descriptions({
  content,
  product,
  variantId,
}: DescriptionsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const handleAddToCart = async () => {
    await addItem(variantId, 1);
  };
  return (
    <section className="container-full flex flex-col md:flex-row justify-center md:justify-start items-center py-8 md:py-20 gap-6 md:gap-35">
      <div className="flex flex-col justify-center items-start gap-8 w-full md:w-[35%] order-2 md:order-1">
        <div className="flex flex-col justify-center items-start gap-4">
          <h2 className="subtitle w-[75%] fade-left">{product.title}</h2>
          <p className="paragraph text-[#6A6A6A] fade-left">
            {product.description}
          </p>
        </div>

        <Button
          label={content.button}
          paddingX="px-6 fade-left"
          onClick={handleAddToCart}
          disabled={isLoading}
        />
      </div>
      <div className="w-full md:w-[50%] h-auto aspect-588/702 relative overflow-hidden group">
        <ProductImage
          src={product.img}
          alt={product.title}
          width={588}
          height={702}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover absolute object-center inset-0 transition-transform duration-1500 ease-linear group-hover:scale-115"
        />
      </div>
    </section>
  );
}
