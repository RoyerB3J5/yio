"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import {
  getOptimizedImageUrl,
  shouldOptimizeProductImage,
} from "@/lib/optimized-images";

interface ProductImageProps extends Omit<
  ImageProps,
  "onError" | "unoptimized" | "src"
> {
  src: string;
}

/**
 * Wrapper sobre next/image que optimiza imágenes de Shopify usando el
 * resize nativo del CDN. Si falla, reintenta con la URL original.
 */
export default function ProductImage({
  src,
  alt,
  width,
  ...props
}: ProductImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageWidth = typeof width === "number" ? width : 640;
  const shouldUseOriginal = failedSource === src;
  const shouldOptimize = shouldOptimizeProductImage(src);

  return (
    <Image
      src={
        shouldUseOriginal || !shouldOptimize
          ? src
          : getOptimizedImageUrl(src, imageWidth)
      }
      alt={alt}
      width={width}
      unoptimized={shouldUseOriginal}
      onError={() => setFailedSource(src)}
      {...props}
    />
  );
}
