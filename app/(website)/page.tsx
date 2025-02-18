import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";

export default async function Page() {
  const data = await sanityFetch({ query: homepageQuery });

  return (
    <main>
      <Content data={data?.homepage?.content} />
    </main>
  );
}
