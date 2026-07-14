"use client";

import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { generateSlug } from "@/lib/slug";
const content = {
  cart: "Your cart",
  empty: "Your cart is empty",
  subtotal: "Subtotal",
  checkout: "Check OUT",
  discount: "Discount",
  shipping: "Shipping & taxes calculated at checkout ",
};
export default function CartDrawer() {
  const cartStore = useCart();
  const [loading, setLoading] = useState(false);
  if (!cartStore) return null;
  const { cart, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } =
    cartStore;
  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error);
        alert("No se pudo generar el link de pago");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <section
      className={`fixed top-0 right-0 w-full h-screen bg-black/50 z-50 flex justify-end items-center transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`sm:w-125 h-full flex flex-col justify-between items-start bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-between items-center w-full px-6 py-4 border-b border-[#E7E7E7]">
            <h2 className="text-[21.3px] leading-[129.71%] text-primary font-normal font-title tracking-[-0.5px]">
              {content.cart} ({cart.length})
            </h2>
            <X
              onClick={closeCart}
              className="cursor-pointer w-7 h-7 text-primary"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center px-6 ">
            {cart.length === 0 ? (
              <div className="flex justify-center items-center pt-6">
                <p className="text-[21.3px] leading-[129.71%] text-primary font-normal font-title tracking-[-0.5px]">
                  {content.empty}
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const shortId = item.id?.split("-")[0];
                const cleanedName = item.name
                  .replace(/\s*\([^)]*\)/g, "")
                  .trim();
                const productSlug = generateSlug(cleanedName);
                return (
                  <div
                    key={item.id}
                    className="w-full flex justify-start items-stretch py-6 border-b border-[#E7E7E7] gap-6"
                  >
                    {/* cambiar el href */}
                    <Link href={`/products/1`} className="cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover w-25.5 h-25.5"
                      />
                    </Link>

                    <div className="flex flex-col justify-between items-start w-full grow">
                      {/* cambiar el href */}
                      <Link href={`/products/1`} className="cursor-pointer">
                        <h3 className="paragraph text-primary font-normal">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex justify-center items-center gap-[11px]">
                          <div className="flex jusitfy-center items-center px-2 py-[10px] gap-6 border border-[#E7E7E7] rounded-full">
                            <Minus
                              className="cursor-pointer w-4 h-auto text-[#B8B8B8]"
                              onClick={() =>
                                updateQuantity(item.id, "decrement")
                              }
                            />
                            <p className="text-[16px] font-medium uppercase leading-[131.25%] text-primary">
                              {item.quantity}
                            </p>
                            <Plus
                              className="cursor-pointer w-4 h-auto text-[#B8B8B8]"
                              onClick={() =>
                                updateQuantity(item.id, "increment")
                              }
                            />
                          </div>
                          <Trash
                            className="cursor-pointer w-4 h-4 text-[#B8B8B8]"
                            onClick={() => removeItem(item.id)}
                          />
                        </div>
                        <p className="paragraph text-primary font-medium">
                          ${Number(item.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center px-4 py-4 gap-10 border-t border-[#E7E7E7]">
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="paragraph text-primary font-medium">
                {content.subtotal}
              </p>
              <p className="paragraph text-primary font-medium">
                ${getTotalPrice()}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <p className="paragraph-xx-small text-primary-light ">
              {content.shipping}
            </p>
            <Button
              onClick={handleClick}
              disabled={loading}
              label={content.checkout}
              styleButton="black"
              paddingX="px-6"
              wFull={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
