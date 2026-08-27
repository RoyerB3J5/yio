"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../../ui/Button";
import Link from "next/link";
import { FragranceListItem } from "@/lib/shopify";

interface FragranceItem {
  isNew: boolean;
  isBestSeller: boolean;
  name: string;
  category: string;
  info: string;
  price: number;
  rate: number;
  img: string;
  href: string;
}

interface CarouselRecommendedProps {
  content: FragranceListItem[];
  locale?: string;
}

export default function CarouselRecommended({ content, locale }: CarouselRecommendedProps) {
  const numItems = content.length;
  const desktopTriplicated = numItems > 0 ? [...content, ...content, ...content] : [];

  const [desktopIndex, setDesktopIndex] = useState(numItems);
  const [isDesktopTransitioning, setIsDesktopTransitioning] = useState(true);
  const [desktopItemWidth, setDesktopItemWidth] = useState(0);
  const [desktopDragOffset, setDesktopDragOffset] = useState(0);
  const [isDesktopDragging, setIsDesktopDragging] = useState(false);

  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopAutoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isDesktopResetting = useRef(false);
  const desktopDragStart = useRef(0);

  const measureDesktopDimensions = useCallback(() => {
    if (!desktopContainerRef.current) return;
    const containerWidth = desktopContainerRef.current.getBoundingClientRect().width;
    setDesktopItemWidth((containerWidth - 8) / 3);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopTransitioning(false);
      measureDesktopDimensions();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureDesktopDimensions]);

  useEffect(() => {
    if (!isDesktopTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsDesktopTransitioning(true);
        isDesktopResetting.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [desktopIndex, isDesktopTransitioning]);

  const stopDesktopAutoplay = useCallback(() => {
    if (desktopAutoplayTimer.current) {
      clearInterval(desktopAutoplayTimer.current);
      desktopAutoplayTimer.current = null;
    }
  }, []);

  const startDesktopAutoplay = useCallback(() => {
    stopDesktopAutoplay();
    if (numItems <= 0) return;
    desktopAutoplayTimer.current = setInterval(() => {
      setIsDesktopTransitioning(true);
      setDesktopIndex((prev) => prev + 1);
    }, 8000);
  }, [numItems, stopDesktopAutoplay]);

  useEffect(() => {
    startDesktopAutoplay();
    return () => stopDesktopAutoplay();
  }, [startDesktopAutoplay, stopDesktopAutoplay]);

  const handleDesktopTransitionEnd = () => {
    if (numItems <= 0 || isDesktopResetting.current) return;

    if (desktopIndex >= 2 * numItems || desktopIndex < numItems) {
      isDesktopResetting.current = true;
      setIsDesktopTransitioning(false);
      const equivalentIndex = numItems + (((desktopIndex % numItems) + numItems) % numItems);
      setDesktopIndex(equivalentIndex);
    }
  };

  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    stopDesktopAutoplay();
    setIsDesktopTransitioning(false);
    desktopDragStart.current = e.clientX;
    setIsDesktopDragging(true);
    setDesktopDragOffset(0);
  };

  const handleDesktopMouseMove = (e: React.MouseEvent) => {
    if (!isDesktopDragging) return;
    const deltaX = e.clientX - desktopDragStart.current;
    setDesktopDragOffset(deltaX);
  };

  const handleDesktopMouseUpOrLeave = () => {
    if (!isDesktopDragging) return;
    setIsDesktopDragging(false);

    const threshold = 50;
    setIsDesktopTransitioning(true);

    if (desktopDragOffset < -threshold) {
      setDesktopIndex((prev) => prev + 1);
    } else if (desktopDragOffset > threshold) {
      setDesktopIndex((prev) => prev - 1);
    }

    setDesktopDragOffset(0);
    startDesktopAutoplay();
  };

  const handleDesktopTouchStart = (e: React.TouchEvent) => {
    stopDesktopAutoplay();
    setIsDesktopTransitioning(false);
    if (e.touches.length > 0) {
      desktopDragStart.current = e.touches[0].clientX;
    }
    setIsDesktopDragging(true);
    setDesktopDragOffset(0);
  };

  const handleDesktopTouchMove = (e: React.TouchEvent) => {
    if (!isDesktopDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - desktopDragStart.current;
    setDesktopDragOffset(deltaX);
  };

  const handleDesktopTouchEnd = () => {
    if (!isDesktopDragging) return;
    setIsDesktopDragging(false);

    const threshold = 50;
    setIsDesktopTransitioning(true);

    if (desktopDragOffset < -threshold) {
      setDesktopIndex((prev) => prev + 1);
    } else if (desktopDragOffset > threshold) {
      setDesktopIndex((prev) => prev - 1);
    }

    setDesktopDragOffset(0);
    startDesktopAutoplay();
  };

  const handleDesktopPrev = () => {
    stopDesktopAutoplay();
    setIsDesktopTransitioning(true);
    setDesktopIndex((prev) => prev - 1);
    startDesktopAutoplay();
  };

  const handleDesktopNext = () => {
    stopDesktopAutoplay();
    setIsDesktopTransitioning(true);
    setDesktopIndex((prev) => prev + 1);
    startDesktopAutoplay();
  };

  const desktopTranslateX = -desktopIndex * (desktopItemWidth + 4) + desktopDragOffset;


  // --- MOBILE CAROUSEL (1 item per slide for fragrances) ---
  const expandedContent = numItems > 0 ? [...content, ...content, ...content] : [];

  const [currentIndex, setCurrentIndex] = useState(numItems);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dimensions, setDimensions] = useState({ itemWidth: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isResetting = useRef(false);
  const dragStart = useRef(0);

  const measureDimensions = useCallback(() => {
    if (!containerRef2.current) return;
    const rect = containerRef2.current.getBoundingClientRect();
    setDimensions({
      itemWidth: rect.width,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTransitioning(false);
      measureDimensions();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureDimensions]);

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
        isResetting.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [currentIndex, isTransitioning]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (numItems <= 0) return;
    autoplayTimer.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 8000);
  }, [numItems, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleTransitionEnd = () => {
    if (numItems <= 0 || isResetting.current) return;

    if (currentIndex >= 2 * numItems || currentIndex < numItems) {
      isResetting.current = true;
      setIsTransitioning(false);
      const equivalentIndex = numItems + (((currentIndex % numItems) + numItems) % numItems);
      setCurrentIndex(equivalentIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    stopAutoplay();
    setIsTransitioning(false);
    dragStart.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current;
    setDragOffset(deltaX);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    setIsTransitioning(true);

    if (dragOffset < -threshold) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    startAutoplay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoplay();
    setIsTransitioning(false);
    if (e.touches.length > 0) {
      dragStart.current = e.touches[0].clientX;
    }
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStart.current;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    setIsTransitioning(true);

    if (dragOffset < -threshold) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    startAutoplay();
  };

  const translateX = -currentIndex * dimensions.itemWidth + dragOffset;

  if (content.length === 0) return null;

  return (
    <>
      <div className="w-full md:w-[90%] lg:w-[70%] hidden md:flex flex-col justify-center items-center relative">
        <div className="w-full max-w-[1240px] flex md:hidden justify-between items-center mb-6">
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={handleDesktopPrev}
              className="w-11 h-11 rounded-full flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer border border-black/10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleDesktopNext}
              className="w-11 h-11 rounded-full flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer border border-black/10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={desktopContainerRef}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
          style={{ touchAction: "pan-y" }}
          onMouseDown={handleDesktopMouseDown}
          onMouseMove={handleDesktopMouseMove}
          onMouseUp={handleDesktopMouseUpOrLeave}
          onMouseLeave={handleDesktopMouseUpOrLeave}
          onTouchStart={handleDesktopTouchStart}
          onTouchMove={handleDesktopTouchMove}
          onTouchEnd={handleDesktopTouchEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            className="flex items-stretch gap-1"
            style={{
              transform: `translate3d(${desktopTranslateX}px, 0, 0)`,
              transition: isDesktopTransitioning ? "transform 300ms ease-out" : "none",
            }}
            onTransitionEnd={handleDesktopTransitionEnd}
          >
            {desktopTriplicated.map((item, index) => {
              const productType = item.productType ?? "fragrances";
              const productGender = item.gender ?? "men";
              const itemHref = item.href.startsWith("/")
                ? item.href
                : `/${[locale, productType, productGender, item.href].filter(Boolean).join("/")}`;

              return (
                <Link
                  href={itemHref}
                  className="shrink-0 bg-[#F8F7F3] flex flex-col justify-center items-center gap-10 p-4"
                  style={{ width: `${desktopItemWidth}px` }}
                  key={index}
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-start gap-2">
                      {item.isNew && (
                        <div className="py-2 px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                          New
                        </div>
                      )}
                      {item.isBestSeller && (
                        <div className="py-2 px-4 bg-[#181818] paragraph-xs text-white uppercase hidden lg:block">
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
                    className="w-[65%] h-auto"
                    width={203}
                    height={270}
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="w-full flex justify-between items-end">
                    <div className="w-full flex flex-col justify-center items-start gap-1 text-black">
                      <h3 className="title-h3">{item.name}</h3>
                      <p className="paragraph uppercase">{item.category}</p>
                      <p className="paragraph uppercase">{item.info}</p>
                    </div>
                    <p className="paragraph-bold">${item.price.toFixed(2)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full relative overflow-hidden flex justify-center items-center flex-col md:hidden pb-8">
        <div
          ref={containerRef2}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
          style={{ touchAction: "pan-y" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            className="flex items-stretch"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: isTransitioning ? "transform 300ms ease-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {expandedContent.map((item, index) => {
              const productType = item.productType ?? "fragrances";
              const productGender = item.gender ?? "men";
              const itemHref = item.href.startsWith("/")
                ? item.href
                : `/${[locale, productType, productGender, item.href].filter(Boolean).join("/")}`;

              return (
                <div
                  key={index}
                  className="w-full shrink-0 flex justify-center"
                  style={{ width: `${dimensions.itemWidth}px` }}
                >
                  <Link
                    href={itemHref}
                    className="w-full bg-[#F8F7F3] flex flex-col justify-center items-center gap-10 p-4 max-w-sm"
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex justify-center items-start gap-2">
                        {item.isNew && (
                          <div className="py-2 px-4 bg-black/8 paragraph-xs text-[#181818] uppercase">
                            New
                          </div>
                        )}
                        {item.isBestSeller && (
                          <div className="py-2 px-4 bg-[#181818] paragraph-xs text-white uppercase hidden lg:block">
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
                      className="w-[65%] h-auto"
                      width={203}
                      height={270}
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="w-full flex justify-between items-end">
                      <div className="w-full flex flex-col justify-center items-start gap-1 text-black">
                        <h3 className="title-h3">{item.name}</h3>
                        <p className="paragraph uppercase">{item.category}</p>
                        <p className="paragraph uppercase">{item.info}</p>
                      </div>
                      <p className="paragraph-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-center items-center gap-6 md:py-6">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}