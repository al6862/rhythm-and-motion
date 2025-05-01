import { PageQueryResult } from "@/sanity.types";
import DOMPurify from "isomorphic-dompurify";

type IGGalleryProps = Extract<
  NonNullable<NonNullable<NonNullable<PageQueryResult>["page"]>["content"]>[0],
  { _type: "igGallery" }
>;

export default function IGGallery({ content }: { content: IGGalleryProps }) {
  const { bgColor, igEmbeds } = content;

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
