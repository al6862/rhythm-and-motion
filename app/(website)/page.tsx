import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";

export async function generateMetadata(): Promise<Metadata> {
  const data =
    (await sanityFetch({
      query: homepageQuery,
      // Metadata should never contain stega
      stega: false,
    })) || {};

  const { SEO } = data.homepage;

  const title = SEO?.metaTitle || "Rhythm & Motion";
  const description = SEO?.metaDescription || "";

  return {
    metadataBase: new URL("https://www.rhythmandmotion.com/"),
    title,
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

export default async function Page() {
  const data = await sanityFetch({ query: homepageQuery });

  return (
    <main>
      <Content data={data?.homepage?.content} />
    </main>
  );
}
