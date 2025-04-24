"use client";

import { useState } from "react";
import { type PortableTextBlock } from "next-sanity";
import { CustomPortableText } from "./CustomPortableText";
import type { ImageData } from "../types/ImageData";
import Image from "next/image";
import { Link } from "./Link";
import { LinkValue } from "sanity-plugin-link-field";

type ClassesSlideshowProps = {
  content: {
    classes: Array<{
      className: string;
      content: PortableTextBlock[];
      bgColor: string;
      image: ImageData | null;
      video: string;
    }>;
    link: LinkValue;
  };
};

export default function ClassesSlideshow({ content }: ClassesSlideshowProps) {
  const { classes, link } = content;
  const [activeClassIndex, setActiveClassIndex] = useState(0);

  return (
    <div
      className={`relative h-screen w-screen${
        classes[activeClassIndex].image?.assetPath ||
        classes[activeClassIndex].video
          ? "transparent"
          : classes[activeClassIndex].bgColor
      }`}
    >
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-[20px] md:bottom-8 md:left-8">
        <div>
          {classes.map((item, index) => (
            <h1
              key={index}
              className={`h1 cursor-pointer text-white transition-all ease-in-out ${
                activeClassIndex !== index ? "opacity-50" : ""
              }`}
              onClick={() => setActiveClassIndex(index)}
            >
              {item.className}
            </h1>
          ))}
        </div>
        <Link link={link}>
          <button className="button">{link.text}</button>
        </Link>
      </div>

      <div className="relative z-10 flex size-full text-white">
        {classes.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 mx-auto flex max-w-[306px] items-center justify-center text-center transition-all duration-700 ease-in-out ${
              activeClassIndex === index
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            {item.content && <CustomPortableText value={item.content} />}
          </div>
        ))}
      </div>

      {classes.map((item, index) => {
        if (item.video) {
          return (
            <video
              width="1920"
              height="1080"
              preload="none"
              autoPlay
              muted
              loop
              playsInline
              key={index}
              className={`absolute top-0 -z-10 size-full object-cover transition-all duration-700 ease-in-out ${
                activeClassIndex === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              style={{
                filter: activeClassIndex === index ? "grayscale(0.2)" : "none",
              }}
            >
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        } else if (item.image?.assetPath) {
          return (
            <Image
              className={`absolute top-0 -z-10 size-full object-cover transition-all duration-700 ease-in-out ${
                activeClassIndex === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              src={item.image.assetPath}
              width={2880}
              height={1720}
              key={index}
              alt={item.image.caption || "missing alt"}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
