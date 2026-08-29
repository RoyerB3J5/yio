"use client";
import Link from "next/link";
import { FragranceListItem } from "@/lib/shopify/transformers";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  item: FragranceListItem;
  locale?: string;
  gender?: string;
  index?: number;
  hoverColor?: string;
  transitionDelay?: number;
  style?: React.CSSProperties;
  className?: string;
}

const hoverColors = [
  "#C5EDAF",
  "#E5B7CD",
  "#CAD6F2",
  "#F2DC94",
  "#D7835B",
];

export default function ProductCard({
  item,
  locale,
  gender = "men",
  index = 0,
  hoverColor,
  transitionDelay = 0,
  style,
  className = "",
}: ProductCardProps) {
  const productType = item.productType ?? "fragrances";
  const productGender = item.gender ?? gender;
  const productHref = `/${[locale, productType, productGender, item.href].filter(Boolean).join("/")}`;
  const effectiveHoverColor = hoverColor ?? hoverColors[index % hoverColors.length];

  return (
    <Link
      href={productHref}
      className={`w-full flex flex-col justify-stretch md:justify-center items-center md:aspect-357/484 h-full fade-up ${className}`}
      style={{ transitionDelay: `${transitionDelay}ms`, ...style } as React.CSSProperties}
    >
      <div
        className="w-full flex flex-col justify-between items-center py-[18px] px-[10px] md:p-4 md:aspect-357/484 bg-[#F8F7F3] hover:bg-[var(--hover-color)] transition-colors duration-300 ease-in-out gap-4 h-full"
        style={{ "--hover-color": effectiveHoverColor } as React.CSSProperties}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-start gap-2">
            {item.isNew && (
              <div className="py-2 px-1 md:px-4 bg-black/8 text-[10px] md:text-[14px] font-normal leading-[100%] text-[#181818] uppercase">
                New
              </div>
            )}
            {item.isBestSeller && (
              <div className="py-2 px-1 md:px-4 bg-[#181818] text-[10px] md:text-[14px] font-normal leading-[100%] text-white uppercase">
                Best Seller
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            <img
              src="/images/start.svg"
              alt="Star"
              className="w-[14px] h-[14px] text-[#151515]"
              width={14}
              height={14}
            />
            <p className="text-[12px] md:text-[16px] font-normal leading-[150%] text-[#181818]">
              {item.rate}
            </p>
          </div>
        </div>
        <ProductImage
          src={item.img}
          alt={item.name}
          className="w-[124px] md:w-[55%] h-auto"
          width={203}
          height={270}
          sizes="(max-width: 768px) 55vw, 25vw"
        />
        <div className="w-full md:flex justify-between items-end hidden">
          <div className="flex flex-col justify-center items-start gap-1 text-black">
            <h3 className="title-h3">{item.name}</h3>
            <p className="paragraph uppercase">{item.category}</p>
            <p className="paragraph uppercase">{item.info}</p>
          </div>
          <p className="paragraph-bold">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-start md:hidden py-[18px] px-2.5">
        <h3 className="title-h3">{item.name}</h3>
        <p className="paragraph uppercase">{item.category}</p>
        <div className="flex w-full justify-between items-start gap-1 text-black mt-[11px]">
          <p className="paragraph uppercase">{item.info}</p>
          <p className="paragraph-bold">${item.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}