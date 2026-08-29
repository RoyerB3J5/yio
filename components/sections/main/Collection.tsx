import { FragranceListItem } from "@/lib/shopify";
import ProductCard from "@/components/ui/ProductCard";

interface CollectionProps {
  content: {
    title: string;
    description: string;
  };
  locale: string;
  product: FragranceListItem[];
}
export default function Collection({
  content,
  product,
  locale,
}: CollectionProps) {
  return (
    <section className="w-full py-8 md:py-20 flex justify-center items-center flex-col gap-6">
      <div className="aspect-718/972 w-full h-auto relative md:hidden block fade-right">
        <img
          src={"/images/main/collection.webp"}
          alt={"Collection YIO Fragrance"}
          width={718}
          height={972}
          className="w-full h-full object-cover object-center absolute inset-0 "
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 text-center px-4 md:px-0">
        <h2 className="subtitle text-black fade-left">{content.title}</h2>
        <p className="paragraph uppercase text-[#6A6A6A] fade-right">
          {content.description}
        </p>
      </div>
      <div className="w-full hidden md:flex justify-center items-start gap-1 relative">
        {/* ----------------- COLUMNA IZQUIERDA (STICKY) ----------------- */}
        {/* Agregamos 'sticky' y 'top-0' (o 'top-20' si tienes un header fijo) */}
        <div className="sticky top-0 w-1/2 h-auto aspect-718/972 relative overflow-hidden fade-right group">
          <img
            src={"/images/main/collection.webp"}
            alt={"Collection YIO Fragrance"}
            width={718}
            height={972}
            className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-1500 ease-linear group-hover:scale-115"
            decoding="async"
            loading="lazy"
          />
        </div>

        {/* ----------------- COLUMNA DERECHA (GRID DE PRODUCTOS) ----------------- */}
        <div className="w-full md:w-1/2 md:grid grid-cols-2 gap-1 justify-center items-center hidden">
          {product.map((item, index) => (
            <ProductCard
              key={item.href}
              item={item}
              locale={locale}
              index={index}
              transitionDelay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
