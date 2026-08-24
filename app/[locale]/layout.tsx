import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Roboto_Slab } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import { CartInit } from "@/components/CartInit";
import { hasLocale, locales } from "@/i18n/routing";
import contentData from "@/content/en";
import type { HeaderContent, FooterContent } from "@/content/types";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { HeroProvider } from "@/components/context/HeroContext";

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
  metadataBase: new URL("https://enyermystudio.com"),

  title: "Your Best",
  description: "Your Best is a ",

  keywords: [
    "Tree Services",
    "Lead Generation",
    "Growth System",
    "Marketing Automation",
  ],

  authors: [{ name: "Your Best" }],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },

  openGraph: {
    type: "website",
    images: [
      {
        url: "/images/fondo.png",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@YourBest",
    images: ["/images/fondo.png"],
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Orlando",
    "geo.position": "28.5383;-81.3792",
    ICBM: "28.5383, -81.3792",
  },
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
