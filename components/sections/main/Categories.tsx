import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";

interface CategoriesProps {
  content: {
    title: string;
    img: string;
    href: string;
    button: {
      label: string;

    };
  }[];
  locale?: string;
}
export default function Categories({ content, locale }: CategoriesProps) {
  const baseLocale = locale ?? defaultLocale;

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-1 ">
      {content.map((category, index) => {
        const isAnchor = category.href.startsWith("#");
        const href = isAnchor ? category.href : `/${baseLocale}${category.href}`;
        const className =
          "w-full h-auto aspect-345/440 flex justify-center items-end p-6 relative group overflow-hidden";

        const inner = (
          <>
            <img
              src={`/images/main/${category.img}.webp`}
              alt={category.title}
              className="w-full h-full object-cover absolute object-center inset-0 z-0 transition-transform duration-1500 ease-linear group-hover:scale-115"
              width={345}
              height={440}
              decoding="async"
              loading="lazy"
            />

            <div className="flex flex-col justify-center items-center gap-2 z-10 ">
              {/* H3: Empieza desplazado hacia abajo y sube al hacer hover */}
              <h3
                className={`text-[20px] font-bold leading-[100%] uppercase font-din-condensed transition-transform duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 ${
                  category.title === "lifestyle" ? "text-black" : "text-white"
                }`}
              >
                {category.title}
              </h3>

              {/* P: Invisible y desplazado hacia abajo. Aparece y sube suavemente */}
              <p
                className={`paragraph uppercase relative transition-all duration-300 ease-out transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
                  category.title === "lifestyle" ? "text-black" : "text-white"
                }`}
              >
                {category.button.label}
              </p>
            </div>
          </>
        );

        return isAnchor ? (
          <a key={index} href={href} className={className}>
            {inner}
          </a>
        ) : (
          <Link key={index} href={href} className={className}>
            {inner}
          </Link>
        );
      })}
    </section>
  );
}