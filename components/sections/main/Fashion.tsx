import Button from "@/components/ui/Button";

interface FashionProps {
  content: {
    title: string;
    buttons: {
      label: string;
      href: string;
    }[];
  };
}
export default function Fashion({ content }: FashionProps) {
  return (
    <section className="w-full flex jusitfy-center items-center py-8 md:py-12">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-morado py-8">
        <h2 className="subtitle text-black">{content.title}</h2>
        <div className="flex justify-center items-center gap-2">
          {content.buttons.map((button, index) => (
            <Button label={button.label} href={button.href} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
