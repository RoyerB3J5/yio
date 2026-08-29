"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { FragranceListItem } from "@/lib/shopify";
import ProductCard from "@/components/ui/ProductCard";

interface BannersProps {
  content: FragranceListItem[];
  locale: string;
}

export default function ProductsBanner({ content, locale }: BannersProps) {
  // 1. AGRUPAMOS LOS ITEMS EN PAREJAS DE 2
  const pairs = [];
  for (let i = 0; i < content.length; i += 2) {
    pairs.push(content.slice(i, i + 2));
  }

  const N = pairs.length; // Ahora N es el número de SLIDES (parejas)
  if (N === 0) return null;

  // Triplicamos las parejas para el bucle infinito sin costuras
  const expandedContent = [...pairs, ...pairs, ...pairs];

  const [currentIndex, setCurrentIndex] = useState(N);
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
    autoplayTimer.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 8000);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleTransitionEnd = () => {
    if (isResetting.current) return;

    if (currentIndex >= 2 * N || currentIndex < N) {
      isResetting.current = true;
      setIsTransitioning(false);
      const equivalentIndex = N + (((currentIndex % N) + N) % N);
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

  // 👇 NUEVOS MANEJADORES PARA LAS FLECHAS
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

  return (
    <div className="w-full relative overflow-hidden flex justify-center items-center flex-col md:hidden pb-8 fade-up">
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
          {/* PRIMER MAP: Itera sobre los SLIDES (Parejas) */}
          {expandedContent.map((pair, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full shrink-0 grid grid-cols-2 gap-1"
            >
              {/* SEGUNDO MAP: Itera sobre los 2 productos dentro de esa pareja */}
              {pair.map((item, itemIndex) => (
                <ProductCard
                  key={`${slideIndex}-${itemIndex}`}
                  item={item}
                  locale={locale}
                  index={slideIndex * 2 + itemIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 👇 CONTENEDOR DE NUEVAS FLECHAS DE NAVEGACIÓN */}
      <div className="w-full flex justify-center items-center gap-6 py-6">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full  flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer "
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full  flex justify-center items-center text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-300 cursor-pointer "
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
