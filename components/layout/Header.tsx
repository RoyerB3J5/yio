"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

import { ChevronDown, MapPin, Menu, Search, User } from "lucide-react";
import CartIconHeader from "../ui/CartIconHeader";

// Multilingual content structure (to be populated/expanded later)
const content = {
  topContent: {
    paragraph: "Descubre nuestros Best Sellers",
    buttonLabel: "Ir ahora",
  },

  nav: [
    { label: "Fragancias", href: "/fragances" },
    { label: "Moda", href: "/fashion" },
    { label: "Best Sellers", href: "/best-sellers" },
  ],
};

export default function Header() {
  const pathname = usePathname() || "/";
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  // Normalize: remove language prefix (en/es) and trailing slash
  const normalized =
    pathname.replace(/^\/(en|es)/, "").replace(/\/$/, "") || "/";

  const grupoUno = ["/", "/fragance/men", "/fashion/men", "/best-seller"];
  const grupoDos = ["/fragance/women", "/fashion/women"];

  const headerClasses = grupoUno.includes(normalized)
    ? isThresholdReached
      ? "bg-white text-black"
      : "bg-transparent text-black"
    : grupoDos.includes(normalized)
      ? isThresholdReached
        ? "bg-black text-white"
        : "bg-transparent text-white"
      : "bg-white text-black";
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
            <Link href="#">
              <p className="text-[14px] font-normal leading-[100%]">
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
            <div className="flex justify-center items-center md:hidden">
              <div className="w-10.5 h-10.5 flex justify-center items-center ">
                <Search
                  className={`w-5 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </div>
              <Link
                href="#"
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
            >
              <p className="text-[20px] md:text-[24px] font-logo font-medium leading-[150%] uppercase">
                your best
              </p>
            </Link>
            <div className="relative bg-transparent flex flex-row justify-center items-center h-auto w-auto z-10 transform translate-x-0 transition-transform duration-300 ease-out">
              <nav>
                <ul className="hidden relative lg:flex items-center flex-row justify-center w-auto">
                  {content.nav.map((item, index) => {
                    const itemPathWithoutHash = item.href.split("#")[0];
                    const isActive = normalized === itemPathWithoutHash;
                    return (
                      <li
                        key={index}
                        className={`flex flex-row items-center justify-center group  w-auto text-center px-4 py-2`}
                      >
                        <Link
                          href={`${item.href}`}
                          className="relative transition-colors duration-300 flex justify-center items-center gap-2"
                        >
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
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex justify-center items-center ">
              <div className="w-10.5 h-10.5 md:flex justify-center items-center hidden">
                <Search
                  className={`w-4 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </div>
              <Link
                href="#"
                className="w-10.5 h-10.5 md:flex justify-center items-center hidden "
              >
                <User
                  className={`w-4 h-auto block ${headerClasses.includes("text-white") ? "text-white" : "text-black"}`}
                />
              </Link>

              <CartIconHeader
                differentStyles={headerClasses.includes("text-white")}
              />
              <button
                type="button"
                aria-label="Abrir menú de navegación"
                title="Abrir menú"
                className="flex lg:hidden items-center justify-center cursor-pointer w-8 h-8 bg-accent rounded-sm"
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
        className={`fixed top-0 right-0 bottom-0 lg:hidden flex items-start bg-primary text-white flex-col justify-center h-[85%] z-[60] py-6 gap-12 transition-transform duration-300 ease-out w-full ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        id="mobile-menu"
      >
        <Image
          src="/images/equis.svg"
          alt="Cerrar menú"
          width="24"
          height="24"
          className="block absolute top-6 right-6 cursor-pointer z-20"
          id="close-btn"
          aria-label="Cerrar menú de navegación"
          title="Cerrar menú"
          role="button"
          tabIndex={0}
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMobileMenuOpen(false);
            }
          }}
        />
        <Link
          href={"/"}
          aria-label={"Ir a la página principal"}
          title={"Your best - Init"}
        >
          <p className="text-[24px] font-logo font-medium leading-[150%] uppercase ">
            your best
          </p>
        </Link>
        <nav className="w-full px-4">
          <ul className="relative flex items-start flex-col justify-center w-full">
            {content.nav.map((item, index) => {
              const itemPathWithoutHash = item.href.split("#")[0];
              const isActive = normalized === itemPathWithoutHash;
              return (
                <li
                  key={index}
                  className={`flex flex-col items-start justify-center group gap-3.5 px-0 w-full py-5 text-start text-white ${isActive ? "bg-accent text-white uppercase px-4" : ""}`}
                >
                  <div className="w-full flex items-center justify-between">
                    <Link
                      href={`${item.href}`}
                      className="relative transition-colors duration-300 flex justify-center items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <p className="font-paragraph font-semibold text-[15px] leading-[150%]">
                        {item.label}
                      </p>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/*<div className="flex flex-col justify-center items-center gap-5 w-full px-4">
          <Button />
        </div>*/}
      </div>
    </>
  );
}
