"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useParams } from "next/navigation";

const content = {
  cart: "Your cart",
  empty: "Your cart is empty",
  subtotal: "Subtotal",
  checkout: "Check OUT",
  shipping: "Shipping & taxes calculated at checkout ",
};

function buildProductUrl(
  locale: string,
  product: { handle: string; productType: string; tags: string[] },
): string {
  const productType = product.productType.toLowerCase();

  const typeMap: Record<string, string> = {
    fragrance: "fragrances",
    fragance: "fragrances",
    clothing: "clothes",
    clothes: "clothes",
  };
  const productTypePath = typeMap[productType] ?? productType;

  const tags = product.tags.map((t) => t.toLowerCase());
  const isWomen = tags.includes("women");
  const isMen = tags.includes("men");
  const gender = isWomen ? "women" : isMen ? "men" : "women";

  return `/${locale}/${productTypePath}/${gender}/${product.handle}`;
}

export default function CartDrawer() {
  const cart = useCartStore((state) => state.cart);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const isLoading = useCartStore((state) => state.isLoading);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      setIsMounted(true);
      // Permitir que el DOM monte el elemento fuera de pantalla antes de aplicar la transición
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Esperar a que la animación de salida (300ms) termine antes de desmontar del DOM
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;

  const params = useParams();
  const locale = (params?.locale as string) || "en";

  if (!isMounted) return null;

  return (
    <section
      className={`fixed top-0 right-0 w-full h-screen bg-black/50 z-50 flex justify-end items-center transition-opacity duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[90%] sm:w-125 h-full flex flex-col justify-between items-start bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-between items-center w-full px-6 py-4 border-b border-[#E7E7E7]">
            <h2 className="text-[21.3px] leading-[129.71%] text-primary font-normal font-title tracking-[-0.5px]">
              {content.cart} ({totalQuantity})
            </h2>
            <X
              onClick={closeDrawer}
              className="cursor-pointer w-7 h-7 text-primary"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center px-6 ">
            {lines.length === 0 ? (
              <div className="flex justify-center items-center pt-6">
                <p className="text-[21.3px] leading-[129.71%] text-primary font-normal font-title tracking-[-0.5px]">
                  {content.empty}
                </p>
              </div>
            ) : (
              lines.map((line) => {
                const item = line.merchandise;
                const imageUrl = item.image?.url ?? "";
                const productHandle = item.product.handle;
                const variantTitle = item.title;
                const showVariant =
                  variantTitle && variantTitle !== "Default Title";
                const productTags = item.product.tags ?? [];
                const productType = item.product.productType;
                const productUrl = buildProductUrl(locale, {
                  handle: productHandle,
                  productType,
                  tags: productTags,
                });

                return (
                  <div
                    key={line.id}
                    className="w-full flex justify-start items-stretch py-4 border-b border-[#E7E7E7] gap-4"
                  >
                    <Link
                      href={productUrl}
                      className="cursor-pointer"
                      onClick={closeDrawer}
                    >
                      <Image
                        src={imageUrl}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="object-cover w-25.5 h-25.5"
                      />
                    </Link>

                    <div className="flex flex-col justify-between items-start w-full grow">
                      <Link
                        href={productUrl}
                        className="cursor-pointer"
                        onClick={closeDrawer}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-start items-center gap-2">
                            <h3 className="paragraph text-black font-normal">
                              {item.product.title}
                            </h3>
                            {showVariant && (
                              <span className="paragraph text-black font-normal">
                                ({variantTitle})
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex justify-center items-center gap-3">
                          <div className="flex justify-center items-center px-2 py-2 gap-2 border border-[#E7E7E7] rounded-full">
                            <Minus
                              className="cursor-pointer w-4 h-auto text-[#B8B8B8]"
                              onClick={() =>
                                updateItem(
                                  line.id,
                                  Math.max(0, line.quantity - 1),
                                )
                              }
                            />
                            <p className="text-[14px] font-medium text-primary min-w-[30px] text-center">
                              {line.quantity}
                            </p>
                            <Plus
                              className="cursor-pointer w-4 h-auto text-[#B8B8B8]"
                              onClick={() =>
                                updateItem(line.id, line.quantity + 1)
                              }
                            />
                          </div>
                          <Trash2
                            className="cursor-pointer w-4 h-4 text-[#B8B8B8] hover:text-red-500"
                            onClick={() => removeItem(line.id)}
                          />
                        </div>
                        <p className="paragraph text-primary font-medium text-sm">
                          ${Number(item.price.amount) * line.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center px-4 py-4 gap-4 border-t border-[#E7E7E7]">
          <div className="w-full flex justify-between items-center">
            <p className="paragraph text-primary font-medium">
              {content.subtotal}
            </p>
            <p className="paragraph text-primary font-medium">
              $
              {cart?.cost?.subtotalAmount?.amount
                ? Number(cart.cost.subtotalAmount.amount).toFixed(2)
                : "0.00"}
            </p>
          </div>
          <p className="paragraph-xx-small text-primary-light w-full text-center">
            {content.shipping}
          </p>
          {cart?.checkoutUrl && (
            <Button
              onClick={() => (window.location.href = cart.checkoutUrl)}
              disabled={isLoading || lines.length === 0}
              label={content.checkout}
              paddingX="px-6"
              wFull={true}
            />
          )}
          {/*<details className="w-full mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              View Raw JSON Response
            </summary>
            <pre
              style={{
                fontSize: "10px",
                whiteSpace: "pre-wrap",
                maxHeight: "30vh",
                overflow: "auto",
                background: "#f5f5f5",
                padding: "12px",
                borderRadius: "4px",
                textAlign: "left",
              }}
            >
              {JSON.stringify(cart, null, 2)}
            </pre>
          </details> */}
        </div>
      </div>
    </section>
  );
}
