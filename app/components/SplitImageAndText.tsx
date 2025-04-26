import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";

type Props = {
  layout: string;
  bgColor: string;
  textColor: string;
  image: ImageData;
  header: string;
  content: PortableTextBlock[];
};

export default function SplitImageAndText({ content }: { content: Props }) {
  const { layout, bgColor, textColor, image, header } = content;
  return (
    <div
      className={
        `flex min-h-screen max-md:flex-col` +
        (layout == "right" ? ` flex-row-reverse` : ``)
      }
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="md:w-1/2">
        <Image
          src={image.assetPath}
          alt={image.caption || "missing alt"}
          width={2880}
          height={2880}
          className="h-[58.95rem] object-cover md:h-full"
        />
      </div>
      <div className="px-[1.6rem] py-32 md:flex md:w-1/2 md:flex-col md:justify-end md:p-24">
        {header && <h2 className="border-t border-white/10 py-32">{header}</h2>}
        {content.content && (
          <div className="ml-auto md:max-w-[30.6rem]">
            <CustomPortableText value={content.content} />
          </div>
        )}
      </div>
    </div>
  );
}
