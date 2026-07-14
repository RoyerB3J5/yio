import Link from "next/link"; // 1. Importamos el Link de Next.js

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
  const baseClasses = `cursor-pointer flex justify-center items-center ${paddingX} py-3 focus:outline-none transition-all duration-300 ease-in-out text-[14px] font-medium leading-[150%] uppercase  text-center tokens-clase z-1 bg-black text-white ${wFull ? "w-full" : "w-auto"}`;
  const clasesFinales = `${baseClasses} `;

  if (href) {
    return (
      <Link href={href} className={clasesFinales}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={clasesFinales}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
