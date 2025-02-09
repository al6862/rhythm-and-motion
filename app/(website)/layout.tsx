import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

import type React from "react";

// export async function generateMetadata(): Promise<Metadata> {
//   const settings = await sanityFetch({
//     query: settingsQuery,
//     // Metadata should never contain stega
//     stega: false,
//   });
//   const title = settings?.title || demo.title;
//   const description = settings?.description || demo.description;

//   const ogImage = resolveOpenGraphImage(settings?.ogImage);
//   let metadataBase: URL | undefined = undefined;
//   try {
//     metadataBase = settings?.ogImage?.metadataBase
//       ? new URL(settings.ogImage.metadataBase)
//       : undefined;
//   } catch {
//     // ignore
//   }
//   return {
//     metadataBase,
//     title: {
//       template: `%s | ${title}`,
//       default: title,
//     },
//     description: toPlainText(description),
//     openGraph: {
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const data = await sanityFetch({ query: settingsQuery });
  // const footer = data?.footer || [];
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
