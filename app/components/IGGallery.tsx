"use client"

import { PageQueryResult } from "@/sanity.types";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";

type IGGalleryProps = Extract<
  NonNullable<NonNullable<NonNullable<PageQueryResult>["page"]>["content"]>[0],
  { _type: "igGallery" }
>;

declare global {
    interface Window {
        instgrm: any;
    }
}

export default function IGGallery({ content }: { content: IGGalleryProps }) {
  const { bgColor, igEmbeds } = content;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      script.remove();
  
      // Remove the property added by the IG embed script
      // so the embed will work again on re-mount.
      if (window.instgrm) delete window.instgrm;
    };
  });

  return (
    <div
      className="scrollbar-width-none flex gap-[0.6rem] overflow-x-scroll px-[1.6rem] py-[7.8rem] md:gap-[3.4rem] md:px-24 md:py-[16.9rem]"
      style={{ backgroundColor: bgColor ? bgColor : "transparent" }}
    >
      {igEmbeds?.map((igEmbed, i) => {
        const cleanEmbed = DOMPurify.sanitize(igEmbed);
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: cleanEmbed }}></div>
        );
      })}
    </div>
  );
}
