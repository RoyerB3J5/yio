"use client";
import { ChevronDown, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { FragranceListItem } from "@/lib/shopify/transformers";
import { useMemo, useState } from "react";

type SortOption = {
  id: string;
  label: string;
  sortFn: (products: FragranceListItem[]) => FragranceListItem[];
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
    image1: string;
    image2?: string;
  };
  gender: string;
  products: FragranceListItem[];
}

export default function GridProducts({
  content,
  products,
  gender,
}: GridProductsProps) {
  const [idSortFilter, setIdSortFilter] = useState("1");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const selectedSortOption =
    sortOptions.find((item) => item.id === idSortFilter) ?? sortOptions[0];

  // Aplicar solo el ordenamiento directamente sobre tus productos
  const sortedProducts = selectedSortOption.sortFn(products);
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 md:gap-12  py-8 md:py-12">
      <div className="container-full flex justify-between items-center md:py-3 text-black">
        <h3 className="paragraph uppercase hidden md:block">
          {sortedProducts.length} {content.title}
        </h3>
        <div className="relative flex justify-center items-center gap-3">
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
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1 grid-flow-dense justify-center itmes-stretch">
        {/* IMAGEN 1: Fila 3 y 4, Columna 3 y 4 (Ocupa 2x2 bloques del grid) */}
        <div className="hidden lg:block lg:col-start-3 lg:row-start-2 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px]">
          <img
            src={`/images/fragances/${content.image1}.webp`}
            alt="Banner Promocional 1"
            className="w-full h-full object-cover"
            width={800}
            height={800}
            decoding="async"
            loading="lazy"
          />
        </div>

        {/* IMAGEN 2: Fila 6 y 7, Columna 1 y 2 (Ocupa 2x2 bloques del grid) */}
        {gender === "men" && (
          <div className="hidden lg:block lg:col-start-1 lg:row-start-5 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px]">
            <img
              src={`/images/fragances/${content.image2}.webp`}
              alt="Banner Promocional 2"
              width={800}
              height={800}
              className="w-full h-full object-cover object-center"
              decoding="async"
              loading="lazy"
            />
          </div>
        )}

        {sortedProducts.map((item, index) => (
          <Link
            href="men/le-male"
            className="w-full bg-[#F8F7F3] flex flex-col justify-between items-center aspect-357/484 px-2.5 py-4.5 md:p-4"
            key={index}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-start gap-2">
                {item.isNew && (
                  <div className="py-2 px-1 md:px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                    New
                  </div>
                )}
                {item.isBestSeller && (
                  <div className="py-2 px-1 md:px-4 bg-[#181818] paragraph-xs text-white uppercase">
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
                <p className="paragraph text-[#181818]">{item.rate}</p>
              </div>
            </div>
            <img
              src={item.img}
              alt={item.name}
              className="w-[55%] h-auto"
              width={203}
              height={270}
              decoding="async"
              loading="lazy"
            />
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col justify-center items-start gap-1 text-black">
                <h3 className="title-h3">{item.name}</h3>
                <p className="paragraph uppercase">{item.category}</p>
                <p className="paragraph uppercase">{item.info}</p>
              </div>
              <p className="paragraph-bold">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
