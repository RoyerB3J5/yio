// lib/shopify/actions.ts
"use server";

import { getFragranceListByGender, getClothingListByGender, getBestSellerProducts } from "./index";
import type { Gender } from "./types";

export async function loadMoreFragrances(gender: Gender, after: string) {
  return getFragranceListByGender(gender, { first: 20, after });
}

export async function loadMoreClothing(gender: Gender, after: string) {
  return getClothingListByGender(gender, { first: 20, after });
}

export async function loadMoreBestSellers(after: string) {
  return getBestSellerProducts({ first: 20, after });
}
