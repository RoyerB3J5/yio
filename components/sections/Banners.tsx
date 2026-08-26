"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../ui/Button";

interface BannersProps {
  content: {
    title: string;
    description: string;
    button: {
      label: string;
      link: string;
    };
  }[];
  locale: string;
}

export default function Banners({ content, locale }: BannersProps) {
  const N = content.length;
  if (N === 0) return null;

  // Triplicating the arrays to achieve a seamless infinite loop
  const expandedContent = [...content, ...content, ...content];

  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dimensions, setDimensions] = useState({ itemWidth: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isResetting = useRef(false);
  const dragStart = useRef(0);
  // Measure actual width of the viewport container
  const measureDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    }, 5000); // Shift every 5 seconds
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
    <div className="w-full relative overflow-hidden flex justify-center items-center flex-col">
      <div
        ref={containerRef}
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
          {expandedContent.map((content, index) => (
            <div
              className="flex flex-col justify-center items-center pt-8 md:pt-32 pb-21 md:pb-42 w-full shrink-0 gap-8 bg-celeste"
              key={index}
            >
              <div className="flex flex-col items-center gap-2 text-center text-dark">
                <h3
                  className="title-banner "
                  dangerouslySetInnerHTML={{ __html: content.title }}
                ></h3>
                <p className="paragraph uppercase w-[80%] md:w-full">
                  {content.description}
                </p>
              </div>
              <Button
                label={content.button.label}
                href={`/${locale}/${content.button.link}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 visible pointer-events-auto flex items-center justify-center gap-4 mb-8 md:mb-32">
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
  );
}
