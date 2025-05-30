import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { headerQuery, homepageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";
import { Header } from "@/app/components/Header";

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
  const [{ header }, data] = await Promise.all([
    sanityFetch({ query: headerQuery }),
    sanityFetch({ query: homepageQuery }),
  ]);

  return (
    <div>
      <Header data={header} color={data?.homepage?.headerColor} />
      <Content data={data?.homepage?.content} />
    </div>
  );
}
