/**
 * Aprovecha el resize nativo del CDN de Shopify vía parámetros de URL.
 * Shopify sirve automáticamente WebP si el navegador lo soporta,
 * así que no necesitamos un proxy externo como weserv.nl.
 */
export function getOptimizedImageUrl(originalUrl: string, width = 640) {
  if (!originalUrl || !/^https?:\/\//i.test(originalUrl)) {
    return originalUrl;
  }

  if (!originalUrl.includes("cdn.shopify.com")) {
    return originalUrl;
  }

  try {
    const url = new URL(originalUrl);
    // Pedimos el doble del ancho esperado para cubrir pantallas retina/2x
    url.searchParams.set("width", String(width * 2));
    return url.toString();
  } catch {
    return originalUrl;
  }
}

export function shouldOptimizeProductImage(src: string) {
  return /^https?:\/\//i.test(src) && src.includes("cdn.shopify.com");
}
