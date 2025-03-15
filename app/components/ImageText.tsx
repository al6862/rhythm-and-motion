import Image from "next/image";
import { type PortableTextBlock } from "next-sanity";
import type { ImageData } from "../types";
import CustomPortableText from "../(website)/portable-text";

type ImageTextProps = {
  content: {
    bgColor: string;
    image: ImageData;
    content: PortableTextBlock[];
    header: string;
  };
};

export default function ImageText({ content }: ImageTextProps) {
  const { bgColor, image, content: textContent, header } = content;

  return (
    <div className="flex flex-col gap-[80px] md:h-screen md:w-screen md:flex-row md:gap-0">
      <div className="relative h-[314.4px] md:size-full">
        {image ? (
          <>
            <Image
              src={image.assetPath}
              alt={image.caption || "missing alt"}
              fill
              className="object-cover grayscale-[20%]"
            />
            <h1 className="absolute inset-0 z-10 hidden items-center justify-center text-white md:flex">
              {header}
            </h1>
          </>
        ) : (
          <div
            className="absolute inset-0 hidden items-center justify-center md:flex"
            style={{ backgroundColor: bgColor }}
          >
            <h1 className="text-white">{header}</h1>
          </div>
        )}
      </div>

      <h1 className="block text-center md:hidden">{header}</h1>
      <div className="mx-auto items-center justify-center overflow-y-scroll bg-white md:w-1/3 md:pb-[16px] md:pl-[16px] md:pr-[30px] md:pt-[134px]">
        {textContent && (
          <div className="rte w-full text-left md:max-w-[415px]">
            <CustomPortableText value={textContent} />
          </div>
        )}
      </div>
    </div>
  );
}
