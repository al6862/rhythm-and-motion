import { sanityFetch } from "@/sanity/lib/fetch";
import { pageQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const data = await sanityFetch({ query: pageQuery, params });

  return <div>{Object.keys(data).length}</div>;
}
