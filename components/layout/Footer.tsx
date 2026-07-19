"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const content = {
  description: {
    title: "INSCRÍBETE PARA <br/> RECIBIR NOVEDADES ",
    name: "¿CUÁL ES TU NOMBRE?",
  },
  women: {
    title: "Mujeres",
    links: [
      { label: "FRAGANCIAS", href: "/fragances/women" },
      { label: "ROPA", href: "/clothes/women" },
      { label: "LIFESTYLE", href: "#" },
    ],
  },
  men: {
    title: "Hombres",
    links: [
      { label: "FRAGANCIAS", href: "/fragances/men" },
      { label: "ROPA", href: "/clothes/men" },
      { label: "LIFESTYLE", href: "#" },
    ],
  },
  bestseller: {
    title: "Best Sellers",
    links: [
      { label: "FRAGANCIAS", href: "/best-seller" },
      { label: "ROPA", href: "/best-seller" },
    ],
  },
  contact: {
    title: "Contáctanos",
    links: [
      { icon: "", label: "+ 609 899 3421", href: "#" },
      { icon: "tiktok", label: "yovani.b1", href: "#" },
      { icon: "instagram", label: "@yovani.store", href: "#" },
    ],
  },
};

export default function Footer() {
  const pathname = usePathname() || "/";
  const match = pathname.match(/^\/(en|es)/);
  const lang = match ? match[1] : "en";

  return (
    <footer className="flex flex-col justify-center items-center w-full">
      <div className="bg-white container-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start py-8 md:py-12 text-black gap-8 md:">
        <div className="flex flex-col justify-center items-start gap-5">
          <h2
            className="title-small"
            dangerouslySetInnerHTML={{ __html: content.description.title }}
          />
          <div className="flex flex-col justify-center items-start gap-4">
            <p className="title-h3">{content.description.name}</p>
            <div className="w-full border border-black px-6 py-3"></div>
            <div className="w-full border border-black px-6 py-3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 justify-start md:justify-center items-start w-full md:w-auto">
          <div className="flex flex-col justify-center items-start md:items-center lg:items-start gap-7">
            <h3 className="font-din-condensed text-[40px] font-bold leading-[100% ] tracking-[-0.5px] text-black">
              {content.women.title}
            </h3>
            <ul className="flex flex-col justify-center items-start md:items-center lg:items-start gap-6">
              {content.women.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start md:items-center lg:items-start gap-7">
            <h3 className="font-din-condensed text-[40px] font-bold leading-[100% ] tracking-[-0.5px] text-black">
              {content.men.title}
            </h3>
            <ul className="flex flex-col justify-center items-start md:items-center lg:items-start gap-6">
              {content.men.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start md:items-center lg:items-start gap-7">
            <h3 className="font-din-condensed text-[40px] font-bold leading-[100% ] tracking-[-0.5px] text-black">
              {content.bestseller.title}
            </h3>
            <ul className="flex flex-col justify-center items-start md:items-center lg:items-start gap-6">
              {content.bestseller.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.href}`}
                    className="paragraph text-black hover:border-black border-b border-transparent transition-all duration-300 ease-in-out pb-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start md:items-center lg:items-start gap-7">
            <h3 className="font-din-condensed text-[40px] font-bold leading-[100% ] tracking-[-0.5px] text-black">
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
