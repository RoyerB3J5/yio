import Link from "next/link";

interface CategoriesProps {
  content: {
    title: string;
    img: string;
    href: string;
  }[];
}
export default function Categories({ content }: CategoriesProps) {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-1 ">
      {content.map((category, index) => (
        <Link
          href={category.href}
          className="w-full h-auto aspect-345/440 flex justify-center items-end p-4 relative"
          key={index}
        >
          <img
            src={`/images/main/${category.img}.webp`}
            alt={category.title}
            className="w-full h-full object-cover absolute object-center inset-0 z-0"
            width={345}
            height={440}
            decoding="async"
            loading="lazy"
          />
          <h3
            className={`text-[20px] font-bold leading-[100%] uppercase font-din-condensed  z-10 ${category.title === "lifestyle" ? "text-black" : "text-white"}`}
          >
            {category.title}
          </h3>
        </Link>
      ))}
    </section>
  );
}
