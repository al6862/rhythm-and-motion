import Link from "next/link";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

export default async function Page() {
  // const [settings, heroPost] = await Promise.all([
  //   sanityFetch({
  //     query: settingsQuery,
  //   }),
  //   sanityFetch({ query: heroQuery }),
  // ]);

  return (
    <div>
      hi
    </div>
  );
}
