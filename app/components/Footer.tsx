import { CustomPortableText } from "./CustomPortableText";
import { type PortableTextBlock } from "next-sanity";
import type { FooterQueryResult } from "@/sanity.types";
// import { type Slug } from "@/sanity.types";

export function Footer({ data }: { data: FooterQueryResult }) {
  const { footer } = data;

  const footerContentValue = footer?.footerContent;
  return (
    <div>
      {footerContentValue && (
        <CustomPortableText value={footerContentValue as PortableTextBlock[]} />
      )}
    </div>
  );
}
