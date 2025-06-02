import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteUrlsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityFetch({
    query: siteUrlsQuery,
    params: { baseUrl: "https://www.rhythmandmotion.com" },
  });
  const { homepage, pages } = data;

  return [homepage, ...pages] as MetadataRoute.Sitemap;
}
