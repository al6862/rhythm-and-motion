import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import { Footer } from "@/app/components/Footer";

import { sanityFetch } from "@/sanity/lib/fetch";
import { footerQuery, siteSettingsQuery } from "@/sanity/lib/queries";

import type React from "react";

import localFont from "next/font/local";

const folio = localFont({
  variable: "--font-folio",
  src: [
    {
      path: "../fonts/Folio-Med.otf",
      weight: "500",
    },
  ],
});

const franklinGothic = localFont({
  variable: "--franklin-gothic",
  src: [
    {
      path: "../fonts/FranklinGothicStd-Condensed.otf",
      weight: "400",
    },
  ],
});

const franklinGothicATF = localFont({
  variable: "--franklin-gothic-atf",
  src: [
    {
      path: "../fonts/FranklinGothic-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-BoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Heavy.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-HeavyItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-BlackItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothic-Ultra.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothic-UltraItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const { SEO } =
    (await sanityFetch({
      query: siteSettingsQuery,
      // Metadata should never contain stega
      stega: false,
    })) || {};

  const title = SEO?.metaTitle || "Rhythm & Motion";
  const description = SEO?.metaDescription || "";

  return {
    metadataBase: new URL("https://www.rhythmandmotion.com/"),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title: SEO?.openGraphTitle,
      description: SEO?.openGraphDescription,
      url: "https://www.rhythmandmotion.com/",
      siteName: title,
      images: [
        {
          url: SEO?.openGraphImage || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  const footer = await sanityFetch({ query: footerQuery });

  return (
    <main
      className={`${folio.variable} ${franklinGothic.variable} ${franklinGothicATF.variable} antialiased`}
    >
      <section className="min-h-screen">
        {isDraftMode && <AlertBanner />}
        {children}
        <Footer data={footer} />
      </section>
      {isDraftMode && <VisualEditing />}
      <SpeedInsights />
    </main>
  );
}
