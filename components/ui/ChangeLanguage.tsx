"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";

export default function ChangeLanguage({ locale }: { locale: string }) {
  const pathname = usePathname() || "/";
  const pathWithoutLocale = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

  return (
    <details className="pl-2 md:pl-2 group relative border-l border-primary/15 flex justify-center items-center">
      <summary className="flex cursor-pointer list-none items-center gap-1 px-0 md:px-2 font-normal [&::-webkit-details-marker]:hidden justify-center py-1">
        <span className=" text-[16px] md:text-[17px]   leading-[0px]">
          {locale.toUpperCase()}
        </span>
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 top-full z-50 mt-1 min-w-16 border border-primary/15 bg-white py-1 shadow-md">
        {locales.map((option) => (
          <Link
            key={option}
            href={
              pathWithoutLocale === "/"
                ? `/${option}`
                : `/${option}${pathWithoutLocale}`
            }
            scroll={false}
            aria-current={option === locale ? "page" : undefined}
            className={`block px-3 py-2 text-[14px] text-black transition-colors hover:bg-accent text-primary ${
              option === locale ? "font-semibold" : ""
            }`}
          >
            {option.toUpperCase()}
          </Link>
        ))}
      </div>
    </details>
  );
}
