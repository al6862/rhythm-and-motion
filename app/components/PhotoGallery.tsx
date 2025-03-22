import Image from "next/image";
import type { ImageData } from "../types";

type PhotoGalleryProps = {
  content: {
    bgColor: string;
    photos: Array<ImageData>;
  };
};

export default function PhotoGallery({ content }: PhotoGalleryProps) {
  const { bgColor, photos } = content;

  return (
    <div
      className="relative flex flex-col justify-center p-4 md:flex-row md:gap-4"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {photos.map((photo) => {
        return (
          <div key={photo.assetPath} className="mx-auto size-[275px] md:mx-0">
            <Image
              src={photo.assetPath}
              width={550}
              height={550}
              alt={photo?.caption || "missing alt"}
              className="size-full object-contain object-center"
            />
          </div>
        );
      })}
    </div>
  );
}
