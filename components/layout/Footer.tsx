"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FooterContent } from "@/content/types";

export default function Footer({ content }: { content: FooterContent }) {
  const pathname = usePathname() || "/";
  const match = pathname.match(/^\/(en|es)/);
  const lang = match ? match[1] : "en";

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    women: false,
    men: false,
    bestseller: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="flex flex-col justify-center items-center w-full">
      <div className="bg-white container-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start py-8 md:py-12 text-black gap-8">
        <div className="flex flex-col justify-center items-start gap-5 w-full md:w-auto">
          <h2
            className="title-small"
            dangerouslySetInnerHTML={{ __html: content.description.title }}
          />
          <div className="flex flex-col justify-center items-start gap-4 w-full hidden">
            <p className="title-h3">{content.description.name}</p>
            <div className="w-full border border-black px-6 py-3"></div>
            <div className="w-full border border-black px-6 py-3"></div>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-4 xl:gap-8 justify-start md:justify-center items-start w-full md:w-auto">
          {/* WOMEN */}
          <div className="flex flex-col w-full md:w-auto justify-center items-start md:items-center lg:items-start gap-4 md:gap-7 py-4 md:py-0">
            <button
              onClick={() => toggleSection("women")}
              className="w-full flex justify-between items-center md:pointer-events-none text-left"
            >
              <h3 className="font-din-condensed text-[40px] font-bold leading-[100%] tracking-[-0.5px] text-black">
                {content.women.title}
              </h3>
              <span className="md:hidden text-black">
                {openSections.women ? (
                  <Minus className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </span>
            </button>
            <ul
              className={`${
                openSections.women ? "flex" : "hidden"
              } md:flex flex-col justify-center items-start md:items-center lg:items-start gap-6 w-full pt-2 md:pt-0`}
            >
              {content.women.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full h-[1px] bg-black/20 md:hidden mt-2" />
          </div>

          {/* MEN */}
          <div className="flex flex-col w-full md:w-auto justify-center items-start md:items-center lg:items-start gap-4 md:gap-7 py-4 md:py-0">
            <button
              onClick={() => toggleSection("men")}
              className="w-full flex justify-between items-center md:pointer-events-none text-left"
            >
              <h3 className="font-din-condensed text-[40px] font-bold leading-[100%] tracking-[-0.5px] text-black">
                {content.men.title}
              </h3>
              <span className="md:hidden text-black">
                {openSections.men ? (
                  <Minus className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </span>
            </button>
            <ul
              className={`${
                openSections.men ? "flex" : "hidden"
              } md:flex flex-col justify-center items-start md:items-center lg:items-start gap-6 w-full pt-2 md:pt-0`}
            >
              {content.men.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full h-[1px] bg-black/20 md:hidden mt-2" />
          </div>

          {/* BEST SELLERS */}
          <div className="flex flex-col w-full md:w-auto justify-center items-start md:items-center lg:items-start gap-4 md:gap-7 py-4 md:py-0">
            <button
              onClick={() => toggleSection("bestseller")}
              className="w-full flex justify-between items-center md:pointer-events-none text-left"
            >
              <h3 className="font-din-condensed text-[40px] font-bold leading-[100%] tracking-[-0.5px] text-black">
                {content.bestseller.title}
              </h3>
              <span className="md:hidden text-black">
                {openSections.bestseller ? (
                  <Minus className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </span>
            </button>
            <ul
              className={`${
                openSections.bestseller ? "flex" : "hidden"
              } md:flex flex-col justify-center items-start md:items-center lg:items-start gap-6 w-full pt-2 md:pt-0`}
            >
              {content.bestseller.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full h-[1px] bg-black/20 md:hidden mt-2" />
          </div>

          {/* CONTACT */}
          <div className="flex flex-col w-full md:w-auto justify-center items-start md:items-center lg:items-start gap-7 py-4 md:py-0">
            <h3 className="font-din-condensed text-[40px] font-bold leading-[100%] tracking-[-0.5px] text-black">
              {content.contact.title}
            </h3>
            <ul className="flex flex-col justify-center items-start md:items-center lg:items-start gap-6">
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
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#E5E5E5] w-full py-3.5 lg:py-4.5 flex justify-center items-center px-5 xl:px-0">
        <div className="w-full max-w-screen lg:max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-6">
          <Link
            href="https://inkshapegroup.com/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/inkshape.svg"
              alt="Logo de Inkshape Group"
              width="208"
              height="40"
              className="w-27.5 lg:w-34 h-auto block "
            />
          </Link>
          <p className="text-[10px] lg:text-[12px] lg:text-[13px] leading-[170%] lg:leading-[120%] text-[#404040]  font-normal text-center">
            Copyright © 2026 by{" "}
            <Link
              href="https://inkshapegroup.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inkshape Group
            </Link>{" "}
            | Privacy | <Link href="/">YIO</Link> | Greenville & Charlotte |
            Call Now: <Link href="tel:+16098993421">(609) 899-3421</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
