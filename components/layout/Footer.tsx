"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const cards = ["visa", "mastercard", "amex", "discover"];
const content = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Shop All", href: "/" },
      { label: "Hair Salon Services", href: "/salon-services" },
      { label: "Our Stylists", href: "/stylists" },
      { label: "Blog", href: "/blog" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Shop by Collections", href: "/shop-collections" },
      { label: "Shop Bundles", href: "/bundles" },
    ],
  },
  servicesArea: {
    title: "Locations",
    areas: [
      "Ocoee",
      "Orlando",
      "Waterford Lakes",
      "St. Petersburg (Coming soon)",
    ],
  },
  aboutUs: {
    title: "About Us",
    description:
      "Professional hair care designed to nourish,restore, and elevate every hair journey.",
  },
};

const socialMedia = [
  {
    icon: "facebook",
    href: "#",
  },
  {
    icon: "instagram",
    href: "#",
  },
];

export default function Footer() {
  const pathname = usePathname() || "/";
  const match = pathname.match(/^\/(en|es)/);
  const lang = match ? match[1] : "en";

  return (
    <footer className="flex flex-col justify-center items-center w-full">
      <div className="bg-primary w-full flex justify-center items-center py-14 text-white gap-10">
        <div className="container-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Quick Links Section */}
          <div className="flex flex-col justify-between items-center lg:items-start gap-10 self-start w-full lg:w-auto pt-5 h-full">
            <div className="flex flex-col justify-center items-center lg:items-start gap-7">
              <h3 className="text-[21.3px] font-normal leading-[119%] font-title">
                {content.quickLinks.title}
              </h3>
              <ul className="flex flex-col justify-center items-center lg:items-start gap-2">
                {content.quickLinks.links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`${item.href}`}
                      className="paragraph text-white hover:text-secondary transition-all duration-300 ease-in-out font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start items-center gap-4">
              {socialMedia.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Image
                    src={`/images/${item.icon}.svg`}
                    width={24}
                    height={24}
                    className="w-7 h-7"
                    decoding="async"
                    loading="lazy"
                    alt={item.icon}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="flex flex-col justify-center items-center lg:items-start gap-7 self-start w-full lg:w-auto pt-5">
            <h3 className="text-[21.3px] font-normal leading-[119%] font-title">
              {content.products.title}
            </h3>
            <ul className="flex flex-col justify-center items-center lg:items-start gap-2">
              {content.products.links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.href}`}
                    className="paragraph text-white hover:text-secondary transition-all duration-300 ease-in-out font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area Section */}
          <div className="flex flex-col justify-center items-center lg:items-start gap-7 self-start w-full lg:w-auto pt-5">
            <h3 className="text-[21.3px] font-normal leading-[119%] font-title">
              {content.servicesArea.title}
            </h3>
            <ul className="flex flex-col justify-center items-center lg:items-start gap-2">
              {content.servicesArea.areas.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/locations`}
                    className="paragraph text-white hover:text-secondary transition-all duration-300 ease-in-out font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Get in Touch Section */}
          <div className="flex flex-col justify-between items-center lg:items-start gap-10 self-start w-full lg:w-auto pt-5 h-full">
            <div className="flex flex-col justify-center items-center lg:items-start gap-7">
              <h3 className="text-[21.3px] font-normal leading-[119%] font-title">
                {content.aboutUs.title}
              </h3>
              <p className="paragraph text-white font-medium">
                {content.aboutUs.description}
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              {cards.map((card) => (
                <Image
                  key={card}
                  alt={card}
                  src={`/images/${card}.svg`}
                  width={56}
                  height={40}
                  className="w-14 h-auto"
                />
              ))}
            </div>
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
            <Image
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
            | Privacy | <Link href="/">Enyermy Studio Pro</Link> | Greenville &
            Charlotte | Call Now:{" "}
            <Link href="tel:+19804679337">(980) 467-9337</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
