import { type PortableTextBlock } from "next-sanity";
import { CustomPortableText } from "./CustomPortableText";
import type { ImageData } from "../types/ImageData";
import Image from "next/image";

type Props = {
  content: {
    marginY: number;
    bgColor: string;
    textColor: string;
    content: PortableTextBlock[];
    image: ImageData;
  };
};

export default function CenteredText({ content }: Props) {
  const { marginY, bgColor, textColor, image } = content;

  return (
    <div
      className="relative"
      style={{
        paddingTop: `${marginY}px`,
        paddingBottom: `${marginY}px`,
        backgroundColor: image ? "transparent" : bgColor,
        color: textColor,
      }}
    >
      {image && (
        <Image
          src={image?.assetPath}
          width={2880}
          height={1720}
          alt={image?.caption || "missing alt"}
          className="absolute top-0 -z-10 size-full object-cover"
        />
      )}
      {content?.content && (
        <div className="rte mx-12 text-center lg:mx-auto lg:max-w-[49.2rem]">
          <CustomPortableText value={content?.content} />
        </div>
      )}
    </div>
  );
}
