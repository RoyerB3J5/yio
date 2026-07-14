interface HeroProps {
  content: {
    image: string;
    title: string;
  };
  changeColor?: boolean;
}
export default function Hero({ content, changeColor = false }: HeroProps) {
  return (
    <section className="w-full h-[calc(100vh-(var(--top-bar-height)))] flex justify-center items-center relative bg-black">
      <img
        src={content.image}
        alt={content.title}
        className="absolute inset-0 object-cover object-center w-full h-full z-0"
        decoding="async"
        loading="eager"
        width={1440}
        height={800}
      />
      <div className="relative z-10 text-center h-full  flex justify-center items-start pt-[20%] md:pt-[6%] px-4 md:px-0">
        <h1
          className={`title-h1 ${changeColor ? "text-black" : "text-white "}`}
          dangerouslySetInnerHTML={{ __html: content.title }}
        ></h1>
      </div>
    </section>
  );
}
