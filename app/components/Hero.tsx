import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";
import { cookies } from "next/headers";

export type HeroProps = {
  header: string;
  content: PortableTextBlock[];
  featuredImages: ImageData[];
  secondaryImages: ImageData[];
};

export default async function Hero({ content }: { content: HeroProps }) {
  const cookieStore = await cookies();
  const seenHero = !!cookieStore.get("seenHero");

  return (
    <div className="hero">
      <div className="max-md:hidden">
        <HeroDesktop content={content} seenHero={seenHero} />
      </div>
      <div className="md:hidden">
        <HeroMobile content={content} seenHero={seenHero} />
      </div>
    </div>
  );
}
