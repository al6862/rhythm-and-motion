import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  headerQuery,
  footerQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

import type React from "react";

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
  const [{ header }, footer] = await Promise.all([
    sanityFetch({ query: headerQuery }),
    sanityFetch({ query: footerQuery }),
  ]);

  return (
    <html lang="en" className="bg-white text-black">
      <body>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <Header data={header} />
          {children}
          <Footer data={footer} />
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
