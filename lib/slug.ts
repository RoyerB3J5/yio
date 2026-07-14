// src/utils/slug.ts

/**
 * Transforma un texto largo (como el nombre de un producto) en un slug amigable para SEO.
 * Ejemplo: "Polera Oversized Negra - Colección 2026" -> "polera-oversized-negra-coleccion-2026"
 */
export function generateSlug(name: string): string {
  if (!name) return "";
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/[\s_-]+/g, '-') // Cambia espacios y guiones bajos por un solo guion
    .split('-')
    .slice(0, 5)              // Se queda SOLO con las primeras 5 palabras para que no sea larguísimo
    .join('-');
}