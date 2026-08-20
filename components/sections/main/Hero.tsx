"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface HeroProps {
  content: {
    title: string;
    carouselImages?: {
      image: string;
      color: string;
    }[];
  };
  changeColor?: boolean;
}

export default function Hero({ content, changeColor = false }: HeroProps) {
  const rawImages =
    content.carouselImages && content.carouselImages.length > 0
      ? content.carouselImages
      : [];
  const N = rawImages.length;

  // Triplicate array for seamless infinite sliding loop
  const expandedImages =
    N > 1 ? [...rawImages, ...rawImages, ...rawImages] : rawImages;

  const [currentIndex, setCurrentIndex] = useState(N > 1 ? N : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dimensions, setDimensions] = useState({ itemWidth: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isResetting = useRef(false);
  const dragStart = useRef(0);

  const measureDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDimensions({ itemWidth: rect.width });
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
    if (N <= 1) return;
    autoplayTimer.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 8000);
  }, [N, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleTransitionEnd = () => {
    if (N <= 1 || isResetting.current) return;

    if (currentIndex >= 2 * N || currentIndex < N) {
      isResetting.current = true;
      setIsTransitioning(false);
      const equivalentIndex = N + (((currentIndex % N) + N) % N);
      setCurrentIndex(equivalentIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (N <= 1 || e.button !== 0) return;
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
    if (N <= 1) return;
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

  const handleSquareClick = (i: number) => {
    if (N <= 1) return;
    stopAutoplay();
    setIsTransitioning(true);
    setCurrentIndex(N + i);
    startAutoplay();
  };

  const translateX = -currentIndex * dimensions.itemWidth + dragOffset;
  const currentLogicalIndex = N > 1 ? (((currentIndex - N) % N) + N) % N : 0;

  return (
    <section className="w-full h-[calc(100vh-(var(--top-bar-height)))] flex justify-center items-center relative bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
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
          className="flex h-full w-full"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 500ms ease-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {expandedImages.map((imgSrc, index) => (
            <div
              key={index}
              className="relative w-full h-full shrink-0 flex-none"
            >
              <img
                src={imgSrc.image}
                alt={content.title}
                className="w-full h-full object-cover object-center pointer-events-none"
                decoding="async"
                loading={index === N ? "eager" : "lazy"}
                width={1440}
                height={800}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center h-full flex justify-center items-start pt-[20%] md:pt-[9%] lg:pt-[10%] xl:pt-[6%] px-4 md:px-0 pointer-events-none">
        <h1
          className={`title-h1 ${content.carouselImages && content.carouselImages[currentLogicalIndex]?.color ? content.carouselImages[currentLogicalIndex].color : "text-white"}`}
          dangerouslySetInnerHTML={{ __html: content.title }}
        ></h1>
      </div>

      {N > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {rawImages.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSquareClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 transition-all duration-300 cursor-pointer ${
                i === currentLogicalIndex ? "bg-[#000000]" : "bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
