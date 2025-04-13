import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import Rhythm from "./Rhythm";
import Ampersand from "./Ampersand";
import Motion from "./Motion";
import Figure from "./Figure";

type HeroProps = {
  header: string;
  content: PortableTextBlock[];
  featuredImages: ImageData[];
  secondaryImages: ImageData[];
};

export default function Hero({ content }: { content: HeroProps }) {
  return (
    <div className="bg-blue">
      <Rhythm />
      <Ampersand />
      <Motion />
      <Figure />
    </div>
  );
}
