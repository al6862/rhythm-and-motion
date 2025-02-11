import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const data = await sanityFetch({ query: homepageQuery });

  return <div>{Object.keys(data).length}</div>;
}
