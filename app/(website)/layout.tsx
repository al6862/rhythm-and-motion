import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";

import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";

import type React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await sanityFetch({
    query: siteSettingsQuery,
    // Metadata should never contain stega
    stega: false,
  }) || {};

  const title = seo?.metaTitle || "Rhythm & Motion";
  const description = seo?.metaDescription || "";

  return {
    metadataBase: new URL("https://www.rhythmandmotion.com/"),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title: seo?.openGraphTitle,
      description: seo?.openGraphDescription,
      url: "https://www.rhythmandmotion.com/",
      siteName: title,
      images: [
        {
          url: seo?.openGraphImage || "",
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

  return (
    <html lang="en" className="bg-white text-black">
      <body>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <main>{children}</main>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
