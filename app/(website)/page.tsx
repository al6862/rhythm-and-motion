import { sanityFetch } from "@/sanity/lib/fetch";
import { headerQuery, homepageQuery } from "@/sanity/lib/queries";
import Content from "@/app/components/Content";
import { Header } from "@/app/components/Header";

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
