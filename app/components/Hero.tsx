import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export type HeroProps = {
  header: string;
  content: PortableTextBlock[];
  featuredImages: ImageData[];
  secondaryImages: ImageData[];
};

export default function Hero({ content }: { content: HeroProps }) {
  return (
    <div className="hero">
      <div className="max-md:hidden">
        <HeroDesktop content={content} />
      </div>
      <div className="md:hidden">
        <HeroMobile content={content} />
      </div>
    </div>
  )
}
