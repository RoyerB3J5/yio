"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { useHeroContext } from "@/components/context/HeroContext";

import {
  ChevronDown,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  User,
  X,
} from "lucide-react";
import CartIconHeader from "../ui/CartIconHeader";
import type { HeaderContent } from "@/content/types";
import ChangeLanguage from "../ui/ChangeLanguage";

const MegaMenu = ({
  lang,
  content,
  index,
}: {
  lang: string;
  content: HeaderContent;
  index: number;
}) => {
  // Render only the column corresponding to the hovered nav item
  if (index === 0) {
    // ----------------- COLUMNA 1: Fragancias -----------------
    return (
      <div className="w-[380px] 3xl:w-[412px] h-[550px] 3xl:h-[614px] overflow-hidden relative shrink-0 flex items-start">
        <img
          src="/images/sub-menu-1.webp"
          alt="Submenú de Fragancias"
          width="412"
          height="614"
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover object-center absolute z-0 inset-0"
        />
        <div className="flex flex-col justify-start items-start gap-8 p-8 z-10 w-full h-full relative">
          <h3
            dangerouslySetInnerHTML={{ __html: content.fracancia.title }}
            className="text-white font-din-condensed font-bold leading-[100%] text-[32px] uppercase text-start"
          />
          <div className="w-full flex flex-col justify-center items-center">
            {content.fracancia.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={`/${lang}${item.href}`}
                className="w-full flex justify-between items-center px-4 py-5 last:border-t border-white/20 hover:bg-black/20 transition-colors duration-300 ease-out text-white paragraph uppercase"
              >
                {item.label}
                <ChevronRight className="w-6 h-6 text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // ----------------- COLUMNA 2: Moda -----------------
    return (
      <div className="w-[420px] h-[550px] 3xl:h-[614px] bg-white overflow-hidden relative">
        <img
          src="/images/sub-menu-2.webp"
          alt="Submenú de Moda"
          className="w-full h-full object-cover object-center absolute z-0 inset-0"
        />
        <div className="flex flex-col justify-start items-start gap-8 px-12 py-10 h-full relative z-10">
          <h3
            dangerouslySetInnerHTML={{ __html: content.moda.title }}
            className="text-black font-din-condensed font-bold leading-[100%] text-[32px] uppercase text-start"
          />
          <div className="w-full flex justify-start items-center">
            {content.moda.items.slice(0, 1).map((item, itemIndex) => (
              <div
                className="flex flex-col justify-center items-start gap-8 border-r pr-8 mr-8 last:border-r-0 last:pr-0 last:mr-0 border-black/20 w-full"
                key={itemIndex}
              >
                <p className="text-black font-din-condensed font-bold leading-[100%] text-[24px]">
                  {item.title}
                </p>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                  {item.list.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`/${lang}${subItem.href}`}
                      className="w-full flex justify-between items-center gap-2 hover:border-black border-b border-transparent transition-all duration-300 ease-out text-black paragraph uppercase py-3"
                    >
                      {subItem.label}
                      <ChevronRight className="w-6 h-6" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    // ----------------- COLUMNA 3: Best Sellers -----------------
    return (
      <div className="w-[380px] 3xl:w-[412px] h-[550px] 3xl:h-[614px] bg-white overflow-hidden relative shrink-0">
        <img
          src="/images/sub-menu-3.webp"
          alt="Submenú de Best Sellers"
          className="w-full h-full object-cover object-center absolute z-0 inset-0"
        />
        <div className="flex flex-col justify-between items-start gap-6 p-10 h-full relative z-10">
          <div className="flex flex-col justify-center items-start gap-8 w-full">
            <h3
              dangerouslySetInnerHTML={{ __html: content.bestSellers.title }}
              className="text-black font-din-condensed font-bold leading-[100%] text-[32px] uppercase text-start"
            />
            <div className="w-full flex flex-col justify-center items-center">
              {content.bestSellers.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={`/${lang}${item.href}`}
                  className="w-full flex justify-between items-center px-4 py-5 last:border-t border-black/20 hover:bg-black/20 transition-colors duration-300 ease-out text-black paragraph uppercase"
                >
                  {item.label}
                  <ChevronRight className="w-6 h-6 text-black" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-2 z-10 w-full">
            <h4
              dangerouslySetInnerHTML={{
                __html: content.bestSellers.banner.title,
              }}
              className="text-black font-din-condensed font-bold leading-[100%] text-[32px] uppercase text-start"
            />
            <p
              dangerouslySetInnerHTML={{
                __html: content.bestSellers.banner.description,
              }}
              className="text-black paragraph text-start"
            />
            <Button
              href={`/${lang}${content.bestSellers.banner.button.href}`}
              label={content.bestSellers.banner.button.label}
              paddingX="px-12"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default function Header({ content }: { content: HeaderContent }) {
  const pathname = usePathname() || "/";
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { currentHeroImage } = useHeroContext();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThresholdReached, setIsThresholdReached] = useState(false);
  const [openMobileAccordions, setOpenMobileAccordions] = useState<
    Record<number, boolean>
  >({});

  // Check if current hero image is one of the women hero images
  const isWomenHeroImage =
    currentHeroImage === "/images/fragances/women-hero.webp" ||
    currentHeroImage === "/images/clothes/women-hero.webp";

  const toggleMobileAccordion = (index: number) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Normalize: remove language prefix (en/es) and trailing slash
  const normalized =
    pathname.replace(/^\/(en|es)/, "").replace(/\/$/, "") || "/";

  const grupoDos = ["/fragance/women", "/clothes/women"];

  // Detecta si hay contenido después de /men o /women (ej. /clothes/women/detalle-123)
  const hasSubPath = /^\/(fragance|clothes)\/(men|women)\/.+/.test(normalized);

  const bgClass = hasSubPath ? "bg-white" : "bg-transparent";
  const textClass =
    grupoDos.includes(normalized) || isWomenHeroImage
      ? "text-white"
      : "text-black";

  // Solo tras pasar el primer viewport, el fondo del header se invierte
  // al color del texto del hero: texto negro -> fondo blanco, texto blanco -> fondo negro.
  const scrolledBg = isThresholdReached
    ? isWomenHeroImage
      ? "bg-black"
      : "bg-white"
    : bgClass;
  const scrolledText = isThresholdReached
    ? isWomenHeroImage
      ? "text-white"
      : "text-black"
    : textClass;

  const headerClasses = `${scrolledBg} ${scrolledText}`;
  const match = pathname.match(/^\/(en|es)/);
  const lang = match ? match[1] : "en";

  useEffect(() => {
    const header = headerRef.current;
    const topBar = topBarRef.current;
    if (!header) return;

    const updateHeaderStyle = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const firstSection =
        document.querySelector(".hero-main-section") ||
        document.querySelector("main > section");
      const threshold = firstSection
        ? (firstSection as HTMLElement).offsetHeight
        : window.innerHeight;

      // Handle hiding/showing on scroll direction (replaces GSAP ScrollTrigger)
      if (scrollY > lastScrollY.current && scrollY > 0) {
        header.style.transform = "translateY(-120%)";
      } else {
        header.style.transform = "translateY(0)";
      }

      setIsThresholdReached(scrollY >= threshold);

      lastScrollY.current = scrollY;
    };

    const updateHeaderHeight = () => {
      const height = header.offsetHeight;
      const heightTopBar = topBar ? topBar.offsetHeight : 0;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`,
      );
      document.documentElement.style.setProperty(
        "--top-bar-height",
        `${heightTopBar}px`,
      );
    };

    window.addEventListener("scroll", updateHeaderStyle, { passive: true });
    window.addEventListener("resize", updateHeaderHeight);

    // Run initial adjustments
    updateHeaderStyle();
    updateHeaderHeight();

    return () => {
      window.removeEventListener("scroll", updateHeaderStyle);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  // Sync body scroll lock with mobile menu state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const headerElement = document.getElementById("main-header");
    const topBarElement = document.getElementById("top-header");
    if (headerElement) {
      const height = headerElement.offsetHeight;
      const heightTopBar = topBarElement ? topBarElement.offsetHeight : 0;
      // Guardamos el valor directamente en la raíz de la página como variable CSS
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`,
      );
      document.documentElement.style.setProperty(
        "--top-bar-height",
        `${heightTopBar}px`,
      );
    }
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 z-50 w-full flex flex-col justify-center items-center top-0 transition-[background-color,transform] duration-300 ease-out"
        id="main-header"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          ref={topBarRef}
          id="top-header"
          className="w-full flex justify-center items-center py-2.5 bg-black"
        >
          <div className="flex justify-center items-center gap-4 text-white">
            <p className="text-[14px] font-normal leading-[120%] py-1">
              {content.topContent.paragraph}
            </p>
            <div className="w-[1px] self-stretch bg-[#D9D9D9]"></div>
            <Link href={`/${lang}/best-sellers`}>
              <p className="text-[14px] font-normal leading-[100%] underline">
                {content.topContent.buttonLabel}
              </p>
            </Link>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`w-full flex justify-center items-center transition-colors duration-300 ${
            headerClasses
          }`}
        >
          <div className="container-full flex justify-between items-center py-3 md:py-1">
            <div className="flex justify-between items-center md:hidden gap-2 w-[90.28px]">
              <button
                type="button"
                aria-label="Abrir menú de navegación"
                title="Abrir menú"
                className="md:hidden flex items-center justify-center cursor-pointer w-8 h-8 bg-accent rounded-sm"
                id="hamburger-btn"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu
                  className={`w-5 md:w-4 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </button>
              <Link
                href={process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL || "#"}
                className="w-10.5 h-10.5  flex justify-center items-center  "
              >
                <User
                  className={`w-5 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </Link>
            </div>
            <Link
              href={"/"}
              aria-label={"Ir a la página principal"}
              title={"Your best - Init"}
              className="translate-x-[0%]"
            >
              <p className="text-[20px] md:text-[24px] font-logo font-medium leading-[150%] uppercase">
                your best
              </p>
            </Link>
            <div className="relative bg-transparent md:flex flex-row justify-center items-center h-auto w-auto z-10 transform translate-x-0 transition-transform duration-300 ease-out hidden ">
              <nav>
                <ul className="hidden relative lg:flex items-center flex-row justify-center w-auto">
                  {content.nav.map((item, index) => {
                    const itemPathWithoutHash = item.href.split("#")[0];
                    const isActive = normalized === itemPathWithoutHash;
                    return (
                      <li
                        key={index}
                        className={`flex flex-row items-center justify-center group relative w-auto text-center px-4 py-2`}
                      >
                        <div className="relative transition-colors duration-300 flex justify-center items-center gap-2">
                          <p
                            className={`paragraph transition-all duration-300 ease-in-out ${headerClasses.includes("text-white") ? "text-white" : "text-black"} uppercase`}
                          >
                            {item.label}
                          </p>
                          <ChevronDown
                            className={`w-4 h-auto ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                          />
                          <span
                            className={`absolute -bottom-2 left-1/2 h-0.5 ${headerClasses.includes("text-white") ? "bg-white" : "bg-black"} transition-all duration-300 ease-out -translate-x-1/2 ${
                              isActive
                                ? "w-8"
                                : "w-0 group-hover:w-8 group-hover:bg-accent"
                            }`}
                          />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block z-50 w-max">
                          <MegaMenu
                            lang={lang}
                            content={content}
                            index={index}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex justify-center items-center ">
              <Link
                href={process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL || "#"}
                className="w-10.5 h-10.5 md:flex justify-center items-center hidden "
              >
                <User
                  className={`w-4 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </Link>
              <CartIconHeader
                differentStyles={headerClasses.includes("text-white")}
              />
              <ChangeLanguage locale={lang} />
              <button
                type="button"
                aria-label="Abrir menú de navegación"
                title="Abrir menú"
                className="hidden md:flex lg:hidden items-center justify-center cursor-pointer w-8 h-8 bg-accent rounded-sm"
                id="hamburger-btn"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu
                  className={`w-5 md:w-4 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 lg:hidden flex items-start justify-between bg-white text-primary flex-col overflow-y-auto z-[60]  pt-10 pb-6 gap-8 transition-transform duration-300 ease-out w-full px-4 h-full ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile-menu"
      >
        <X
          className="block absolute top-6 right-6 cursor-pointer z-20"
          id="close-btn"
          aria-label="Cerrar menú de navegación"
          role="button"
          tabIndex={0}
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMobileMenuOpen(false);
            }
          }}
        />
        <nav className="w-full">
          <ul className="relative flex items-start flex-col justify-center w-full">
            <li className="flex flex-col w-full text-black">
              <a
                className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
                href={`/${lang}`}
              >
                <p className="font-bold text-[32px] leading-[150%] uppercase tracking-[-0.5px] font-din-condensed">
                  {lang == "es" ? "Inicio" : "Home"}
                </p>
              </a>

              {/* Separator line */}
              <div className="w-full h-[1px] bg-black" />
            </li>
            {content.nav.map((item, index) => {
              const isOpen = !!openMobileAccordions[index];
              return (
                <li key={index} className="flex flex-col w-full text-black">
                  <button
                    onClick={() => toggleMobileAccordion(index)}
                    className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
                  >
                    <p className="font-bold text-[32px] leading-[150%] font-din-condensed tracking-[-0.5px]">
                      {item.label}
                    </p>
                    <span className="text-black">
                      {isOpen ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="w-full pb-4 pt-1 flex flex-col gap-4">
                      {/* Fragancias */}
                      {index === 0 && (
                        <div className="flex flex-col gap-3">
                          {content.fracancia.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              className="paragraph text-black text-sm uppercase py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Moda (Two Columns Layout) */}
                      {index === 1 && (
                        <div className="grid grid-cols-2 gap-4">
                          {content.moda.items
                            .slice(0, 1)
                            .map((modaItem, modaIdx) => (
                              <div
                                key={modaIdx}
                                className="flex flex-col gap-2"
                              >
                                <p className="font-din-condensed font-bold text-lg text-black uppercase">
                                  {modaItem.title}
                                </p>
                                <div className="flex flex-col gap-1">
                                  {modaItem.list.map((subItem, subIdx) => (
                                    <Link
                                      key={subIdx}
                                      href={subItem.href}
                                      className="paragraph text-black text-sm uppercase py-1"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Best Sellers */}
                      {index === 2 && (
                        <div className="flex flex-col gap-3">
                          {content.bestSellers.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              className="paragraph text-black text-sm uppercase py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Separator line */}
                  <div className="w-full h-[1px] bg-black" />
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="w-full flex flex-col justify-center items-start gap-16">
          <div className="flex flex-col justify-center items-start relative p-4 aspect-343/220 w-full">
            <img
              src="/images/sub-menu-3.webp"
              alt="Mobile Content"
              className="w-full h-full object-cover absolute inset-0 object-center z-0"
            />
            <div className="flex flex-col justify-center items-start gap-2 relative z-10">
              <h3 className="text-[32px] font-bold leading-[120%] text-black w-[60%] font-din-condensed">
                {" "}
                {content.mobileContent.label}
              </h3>
              <Button
                label={content.mobileContent.button.label}
                href={content.mobileContent.button.href}
              />
            </div>
          </div>
          <ul className="flex  justify-center items-start  gap-6">
            {content.contact.links.map((item, index) => (
              <li key={index}>
                <Link
                  href={`${item.href}`}
                  className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1 flex justify-center items-center gap-2"
                >
                  {item.icon !== "" && (
                    <img
                      src={`/images/${item.icon}.svg`}
                      alt={item.label}
                      className="w-6 h-6"
                      decoding="async"
                      loading="lazy"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
