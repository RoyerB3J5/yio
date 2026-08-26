import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Roboto_Slab } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import { CartInit } from "@/components/CartInit";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { HeroProvider } from "@/components/context/HeroContext";
import { hasLocale, locales } from "@/i18n/routing";
import type { HeaderContent, FooterContent } from "@/content/types";

async function getContent(locale: string) {
  const contentModule = await import(`@/content/${locale}`);
  return contentModule.default;
}

const dinnextLTPro = localFont({
  src: [
    {
      path: "../../public/fonts/DINNextLTPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DINNextLTPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/DINNextLTPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dinnextltpro",
});

const dinnextLTProCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/DINNextLTPro-BoldCondensed.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-din-cond",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ybmybest.com/"),

  title: {
    default: "Your Best | Online Boutique - Fragrances & Fashion",
    template: "%s | Your Best",
  },
  description:
    "Discover Your Best - your exclusive online boutique for luxury fragrances and fashion. Shop curated collections for men and women: designer perfumes, exclusive clothing, and best sellers. Free shipping on orders over $100.",

  keywords: [
    "online boutique",
    "luxury fragrances",
    "designer perfumes",
    "exclusive fashion",
    "clothing for men",
    "clothing for women",
    "best sellers",
    "perfumes for men",
    "perfumes for women",
    "designer clothing",
    "Your Best",
  ],

  authors: [{ name: "Your Best" }],
  creator: "Your Best",
  publisher: "Your Best",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
      "x-default": "/en",
    },
  },

  openGraph: {
    type: "website",
    siteName: "Your Best",
    title: "Your Best | Online Boutique - Fragrances & Fashion",
    description:
      "Discover Your Best - your exclusive online boutique for luxury fragrances and fashion. Shop curated collections for men and women.",
    url: "https://ybmybest.com/",
    images: [
      {
        url: "/images/main/hero.webp",
        width: 1200,
        height: 630,
        alt: "Your Best - Luxury Fragrances & Fashion Boutique",
      },
    ],
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yourbest",
    creator: "@yourbest",
    title: "Your Best | Online Boutique - Fragrances & Fashion",
    description:
      "Discover Your Best - your exclusive online boutique for luxury fragrances and fashion.",
    images: ["/images/main/hero.webp"],
  },

  verification: {
    google: "your-google-verification-code",
  },

  category: "shopping",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const contentData = await getContent(locale);

  return (
    <html
      lang={locale}
      className={`${dinnextLTPro.variable} ${dinnextLTProCondensed.variable} ${robotoSlab.variable} w-full h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://widgets.leadconnectorhq.com" />
      </head>

      <body className="w-full font-family antialiased overflow-x-clip bg-white flex flex-col justify-center items-center ">
        <ScrollAnimations />

        <CartInit />
        <HeroProvider>
          <Header content={contentData.header as HeaderContent} />
          {children}
          <Footer content={contentData.footer as FooterContent} />
        </HeroProvider>

        <CartDrawer />
      </body>
    </html>
  );
}
