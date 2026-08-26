"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../ui/Button";

interface BannersProps {
  content: {
    image: string;
    title: string;
    description: string;
    button: {
      label: string;
      link: string;
    };
  }[];
  locale: string;
}

export default function ProductsBanner({ content, locale }: BannersProps) {
  const N = content.length;
  if (N === 0) return null;

  // Triplicating the arrays to achieve a seamless infinite loop
  const expandedContent = [...content, ...content, ...content];

  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dimensions, setDimensions] = useState({ itemWidth: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isResetting = useRef(false);
  const dragStart = useRef(0);
  // Measure actual width of the viewport container
  const measureDimensions = useCallback(() => {
    if (!containerRef2.current) return;
    const rect = containerRef2.current.getBoundingClientRect();
    setDimensions({
      itemWidth: rect.width,
    });
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsTransitioning(false);
      measureDimensions();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureDimensions]);

  // Handle state recovery after an instant jump (reset)
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
        isResetting.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [currentIndex, isTransitioning]);

  // Autoplay functionality
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
    }, 8000); // Shift every 8 seconds
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  // Handle transition ends to perform seamless infinite loop jumps
  const handleTransitionEnd = () => {
    if (isResetting.current) return;

    if (currentIndex >= 2 * N || currentIndex < N) {
      isResetting.current = true;
      setIsTransitioning(false);
      const equivalentIndex = N + (((currentIndex % N) + N) % N);
      setCurrentIndex(equivalentIndex);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
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

    const threshold = 50; // drag threshold in pixels to trigger slide shift
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

  const handleDotClick = (i: number) => {
    stopAutoplay();
    setIsTransitioning(true);
    setCurrentIndex(N + i);
    startAutoplay();
  };
  const translateX = -currentIndex * dimensions.itemWidth;
  const currentLogicalIndex = (((currentIndex - N) % N) + N) % N;

  return (
    <div className="w-full relative overflow-hidden flex justify-center items-center flex-col py-8 md:py-10 lg:py-20 gap-6 md:gap-0">
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
          className="flex items-start md:items-stretch"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 300ms ease-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {expandedContent.map((content, index) => (
            <div
              className="w-full shrink-0 flex justify-center items-center "
              key={index}
            >
              <div className="flex flex-col md:flex-row justify-center md:justify-start items-center container-full gap-6 md:gap-16 xl:gap-34">
                <div className="aspect-343/409 md:aspect-149/178 w-full md:w-[50%] h-auto relative overflow-hidden group">
                  <img
                    src={content.image}
                    alt={content.title}
                    width={668}
                    height={798}
                    className="w-full h-full object-cover inset-0 absolute object-center transition-transform duration-1500 ease-linear group-hover:scale-115"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-4 lg:gap-3 xl:gap-8 text-center w-full md:w-[50%]">
                  <h3
                    className="subtitle text-black text-start"
                    dangerouslySetInnerHTML={{ __html: content.title }}
                  />
                  <p className="paragraph text-[#6A6A6A] text-start w-full xl:w-[80%] grow">
                    {content.description}
                  </p>
                  <Button
                    label={content.button.label}
                    href={`/${locale}${content.button.link}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative md:absolute md:bottom-[2%] lg:bottom-[18%] md:left-0 w-full flex justify-center pointer-events-none">
        <div className="flex justify-start items-center container-full gap-16 xl:gap-34 w-full">
          {/* Espejo de la columna de la imagen (Vacía) */}
          <div className="w-[50%] hidden md:block" />

          {/* Espejo de la columna de texto (Aquí alineamos los dots) */}
          <div className="w-full md:w-[50%] flex justify-start items-center gap-4 pointer-events-auto">
            {content.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentLogicalIndex
                    ? "bg-black scale-110"
                    : "bg-[#2D2D2D]/20 hover:bg-[#2D2D2D]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
