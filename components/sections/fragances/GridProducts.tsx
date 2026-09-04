"use client";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { FragranceListItem } from "@/lib/shopify/transformers";
import { useMemo, useState, useTransition } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { loadMoreFragrances } from "@/lib/shopify/actions";
import { Gender } from "@/lib/shopify/types";

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

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface GridProductsProps {
  content: {
    title: string;
    filter1: string;
    filter2: string;
    image1: string;
    image2?: string;
  };
  gender: Gender;
  locale?: string;
  products: FragranceListItem[];
  pageInfo: PageInfo;
}

export default function GridProducts({
  content,
  products: initialProducts,
  gender,
  locale,
  pageInfo: initialPageInfo,
}: GridProductsProps) {
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [idSortFilter, setIdSortFilter] = useState("1");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const selectedSortOption =
    sortOptions.find((item) => item.id === idSortFilter) ?? sortOptions[0];

  // Aplicar solo el ordenamiento directamente sobre tus productos
  const sortedProducts = selectedSortOption.sortFn(products);
  function loadMore() {
    if (!pageInfo.endCursor) return;
    setError(null);

    startTransition(async () => {
      try {
        const { products: newProducts, pageInfo: newPageInfo } =
          await loadMoreFragrances(gender, pageInfo.endCursor!);

        setProducts((prev) => [...prev, ...newProducts]);
        setPageInfo(newPageInfo);
      } catch {
        setError("We couldn't load more products. Please try again later.");
      }
    });
  }
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 md:gap-12  py-8 md:py-12 lg:py-20">
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
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1 grid-flow-dense justify-center itmes-stretch">
        {/* IMAGEN 1: Fila 3 y 4, Columna 3 y 4 (Ocupa 2x2 bloques del grid) */}
        {sortedProducts.length > 4 && (
          <div className="hidden lg:block lg:col-start-3 lg:row-start-2 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px] group overflow-hidden fade-left">
            <img
              src={`/images/fragances/${content.image1}.webp`}
              alt="Banner Promocional 1"
              className="w-full h-full object-cover transition-transform duration-1500 ease-linear group-hover:scale-115"
              width={800}
              height={800}
              decoding="async"
              loading="lazy"
            />
          </div>
        )}

        {/* IMAGEN 2: Fila 6 y 7, Columna 1 y 2 (Ocupa 2x2 bloques del grid) */}
        {gender === "men" && sortedProducts.length > 8 && (
          <div className="hidden lg:block lg:col-start-1 lg:row-start-5 lg:col-span-2 lg:row-span-2 w-full h-full min-h-[400px] group overflow-hidden fade-right">
            <img
              src={`/images/fragances/${content.image2}.webp`}
              alt="Banner Promocional 2"
              width={800}
              height={800}
              className="w-full h-full object-cover object-center transition-transform duration-1500 ease-linear group-hover:scale-115"
              decoding="async"
              loading="lazy"
            />
          </div>
        )}

        {sortedProducts.map((item, index) => (
          <ProductCard
            key={item.href}
            item={item}
            locale={locale}
            gender={gender}
            index={index}
            transitionDelay={index * 50}
          />
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="px-6 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Loading..." : "See More Products"}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}
    </section>
  );
}
