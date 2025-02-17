import { sanityFetch } from "@/sanity/lib/fetch";
import { pageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const data = await sanityFetch({ query: pageQuery, params });

  return (
    <main>
      <Content data={data?.homepage?.content} />
    </main>
  );
}
