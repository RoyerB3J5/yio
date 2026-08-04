import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  paddingX?: string;
  wFull?: boolean;
}

export default function Button({
  label,
  onClick,
  type = "button",
  disabled,
  href,
  paddingX = "px-12",
  wFull = false,
}: ButtonProps) {
  const baseClasses = `group relative overflow-hidden cursor-pointer flex justify-center items-center ${paddingX} py-2 focus:outline-none text-[14px] font-medium leading-[150%] uppercase text-center z-10 bg-black text-white ${
    wFull ? "w-full" : "w-auto"
  }`;

  const renderContent = () => (
    <span className="relative inline-flex items-center justify-center overflow-hidden">
      {/* TEXTO 1: Sin transición por defecto. Al hacer hover activa la animación hacia arriba */}
      <span className="inline-block transform transition-none group-hover:transition-all group-hover:duration-300 group-hover:ease-out group-hover:-translate-y-full group-hover:opacity-0">
        {label}
      </span>

      {/* TEXTO 2: Empieza oculto abajo. Al hacer hover sube a la posición inicial animado */}
      <span className="absolute inset-0 flex items-center justify-center transform translate-y-full opacity-0 transition-none group-hover:transition-all group-hover:duration-300 group-hover:ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {label}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={baseClasses}
      onClick={onClick}
    >
      {renderContent()}
    </button>
  );
}
