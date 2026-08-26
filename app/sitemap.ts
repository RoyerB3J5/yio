import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getFragranceListByGender } from "@/lib/shopify";
import { getClothingListByGender } from "@/lib/shopify";
import { getBestSellerProducts } from "@/lib/shopify";

const SITE_URL = "https://ybmybest.com/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
    },
    {
      url: `${SITE_URL}/${locale}/fragances/men`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/fragances/men`]),
        ),
      },
    },
    {
      url: `${SITE_URL}/${locale}/fragances/women`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/fragances/women`]),
        ),
      },
    },
    {
      url: `${SITE_URL}/${locale}/clothes/men`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/clothes/men`]),
        ),
      },
    },
    {
      url: `${SITE_URL}/${locale}/clothes/women`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/clothes/women`]),
        ),
      },
    },
    {
      url: `${SITE_URL}/${locale}/best-sellers`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/best-sellers`]),
        ),
      },
    },
  ]);

  try {
    const [fragranceMen, fragranceWomen, clothingMen, clothingWomen, bestSellers] =
      await Promise.all([
        getFragranceListByGender("men"),
        getFragranceListByGender("women"),
        getClothingListByGender("men"),
        getClothingListByGender("women"),
        getBestSellerProducts(),
      ]);

    const fragranceRoutes = locales.flatMap((locale) =>
      [...(fragranceMen.products ?? []), ...(fragranceWomen.products ?? [])].map(
        (product) => ({
          url: `${SITE_URL}/${locale}/fragances/${product.gender ?? "men"}/${product.href}`,
          lastModified: new Date(product.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [
                l,
                `${SITE_URL}/${l}/fragances/${product.gender ?? "men"}/${product.href}`,
              ]),
            ),
          },
        }),
      ),
    );

    const clothingRoutes = locales.flatMap((locale) =>
      [...(clothingMen.products ?? []), ...(clothingWomen.products ?? [])].map(
        (product) => ({
          url: `${SITE_URL}/${locale}/clothes/${product.gender ?? "men"}/${product.href}`,
          lastModified: new Date(product.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [
                l,
                `${SITE_URL}/${l}/clothes/${product.gender ?? "men"}/${product.href}`,
              ]),
            ),
          },
        }),
      ),
    );

    const bestSellerRoutes = locales.flatMap((locale) =>
      (bestSellers.products ?? []).map((product) => ({
        url: `${SITE_URL}/${locale}/clothes/${product.gender ?? "men"}/${product.href}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${SITE_URL}/${l}/clothes/${product.gender ?? "men"}/${product.href}`,
            ]),
          ),
        },
      })),
    );

    return [...staticRoutes, ...fragranceRoutes, ...clothingRoutes, ...bestSellerRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}