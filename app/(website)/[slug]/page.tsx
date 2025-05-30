import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { headerQuery, pageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";
import { Header } from "@/app/components/Header";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data =
    (await sanityFetch({
      query: pageQuery,
      params,
      // Metadata should never contain stega
      stega: false,
    })) || {};

  const title = data.page.title;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function Page({ params }: Props) {
  const [{ header }, data] = await Promise.all([
    sanityFetch({ query: headerQuery }),
    sanityFetch({ query: pageQuery, params }),
  ]);

  return (
    <div>
      <Header data={header} color={data?.page?.headerColor} />
      <Content data={data?.page?.content} />
    </div>
  );
}
