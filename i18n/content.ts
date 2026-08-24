import "server-only";

import type { Locale } from "./routing";
import type { ContentDictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<ContentDictionary>> = {
  en: () => import("@/content/en").then((module) => module.default),
  es: () => import("@/content/es").then((module) => module.default),
};

export async function getContent<T = ContentDictionary>(
  locale: Locale,
): Promise<T> {
  return (await dictionaries[locale]()) as T;
}
