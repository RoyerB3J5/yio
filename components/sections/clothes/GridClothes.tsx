"use client";
import { ChevronDown, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import {
  ClothingListItem,
  FragranceListItem,
} from "@/lib/shopify/transformers";
import { useState } from "react";
import ProductImage from "@/components/ui/ProductImage";

type ProductItem = ClothingListItem | FragranceListItem;

type SortOption = {
  id: string;
  label: string;
  sortFn: (products: ProductItem[]) => ProductItem[];
};

const sortOptions: SortOption[] = [
  { id: "1", label: "All", sortFn: (p) => p },
  {
    id: "2",
    label: "Price: High to Low",
    sortFn: (p) => [...p].sort((a, b) => Number(b.price) - Number(a.price)),
  },
  {
    id: "3",
    label: "Price: Low to High",
    sortFn: (p) => [...p].sort((a, b) => Number(a.price) - Number(b.price)),
  },
  {
    id: "4",
    label: "Newest",
    sortFn: (p) =>
      [...p].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      ),
  },
  {
    id: "5",
    label: "Best Sellers",
    sortFn: (p) => p.filter((product) => product.isBestSeller === true),
  },
];

interface GridProductsProps {
  content: {
    title: string;
    filter1: string;
    filter2: string;
  };
  gender?: string;
  locale?: string;
  products: ProductItem[];
}
export default function GridProducts({
  content,
  products,
  gender,
  locale,
}: GridProductsProps) {
  const [idSortFilter, setIdSortFilter] = useState("1");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const selectedSortOption =
    sortOptions.find((item) => item.id === idSortFilter) ?? sortOptions[0];

  // Aplicar solo el ordenamiento directamente sobre tus productos
  const sortedProducts = selectedSortOption.sortFn(products);
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 md:gap-12 py-8 md:py-12">
      <div className="container-full flex justify-between items-center md:py-3 text-black z-5">
        <h3 className="paragraph uppercase block fade-right">
          {sortedProducts.length} {content.title}
        </h3>
        <div className="relative flex justify-center items-center gap-3 fade-left">
          <p className="paragraph">{content.filter2}</p>
          <button
            className="flex justify-center items-center gap-4"
            onClick={() => setSortDropdownOpen((prev) => !prev)}
          >
            {selectedSortOption.label}
            <ChevronDown className="w-6 h-6" />
          </button>
          {sortDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 flex flex-col bg-white border border-black/10 rounded-lg shadow-lg z-10 p-4 ">
              {sortOptions.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center gap-2 p-2 text-primary text-[15px] font-medium leading-[150%]  text-left rounded-sm whitespace-nowrap ${
                    item.id === idSortFilter
                      ? ""
                      : "hover:bg-black/5 cursor-pointer"
                  }`}
                  onClick={() => {
                    setIdSortFilter(item.id);
                    setSortDropdownOpen(false);
                  }}
                >
                  <span className="w-4 h-4 rounded-full border border-black/10 flex items-center justify-center shrink-0 text-black">
                    {item.id === idSortFilter && (
                      <span className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </span>
                  <p className="paragraph">{item.label}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1 grid-flow-dense jusitfy-center items-stretch">
        {sortedProducts.map((item, index) => {
          const productType =
            item.productType ?? ("variants" in item ? "clothes" : "fragances");
          const productGender = item.gender ?? gender;
          const productHref = `/${[
            locale,
            productType,
            productGender,
            item.href,
          ]
            .filter(Boolean)
            .join("/")}`;

          return (
            <div
              className="w-full bg-white flex flex-col justify-start items-center fade-up"
              style={{ transitionDelay: `${index * 0.1}s` }}
              key={index}
            >
              <div className="w-full h-auto aspect-357/420 relative overflow-hidden flex items-end group transition-all duration-300 ease-in-out">
                <Link href={productHref} className="absolute inset-0 z-0">
                  <ProductImage
                    src={item.img}
                    alt={item.name}
                    className={
                      productType === "fragances"
                        ? "absolute inset-y-0 left-1/2 h-full w-[60%] -translate-x-1/2 object-contain object-center"
                        : "w-full h-full object-cover absolute inset-0 object-center"
                    }
                    width={357}
                    height={470}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </Link>
                <div className="flex justify-center items-center gap-2 transition-all duration-300 ease-in-out z-10 relative w-full px-4 flex-wrap pb-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  {productType === "clothes" &&
                    "variants" in item &&
                    item.variants.map((variant) =>
                      variant.availableForSale ? (
                        <Link
                          className="bg-white px-6 py-2 border border-black flex justify-center items-center paragraph text-black uppercase cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                          href={`${productHref}?variant=${encodeURIComponent(variant.id)}`}
                          key={variant.id}
                        >
                          {variant.name}
                        </Link>
                      ) : (
                        <button
                          className="bg-white px-6 py-2 border border-black flex justify-center items-center paragraph text-black uppercase opacity-50 cursor-not-allowed"
                          disabled
                          key={variant.id}
                        >
                          {variant.name}
                        </button>
                      ),
                    )}
                </div>
              </div>
              <Link
                href={productHref}
                className="w-full flex flex-col justify-center items-start gap-4 px-2.5 py-4.5 md:p-4"
              >
                <div className="flex justify-center items-start gap-2">
                  {item.isNew && (
                    <div className="py-2 px-1 md:px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                      New
                    </div>
                  )}
                  {item.isBestSeller && (
                    <div className="py-2 px-1 md:px-4 bg-[#181818] paragraph-xs text-white uppercase ">
                      Best Seller
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-start gap-2 text-black w-full">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="title-h3">{item.name}</h3>
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src="/images/start.svg"
                        alt="Star"
                        className="w-[14px] h-[14px] text-[#151515]"
                        width={14}
                        height={14}
                      />
                      <p className="paragraph text-[#181818]">{item.rate}</p>
                    </div>
                  </div>
                  <p className="paragraph uppercase">{item.category}</p>
                  <p className="paragraph-bold">${item.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
