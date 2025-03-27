import { LinkValue } from "sanity-plugin-link-field";
import { CustomPortableText } from "./CustomPortableText";
import { type PortableTextBlock } from "next-sanity";
// import { type Slug } from "@/sanity.types";

type Props = {
    data: {
        linkLists: Array<{
          links: LinkValue[];
        }>;
        newsletterContent: PortableTextBlock[] | undefined;
        footerContent: PortableTextBlock[] | undefined;
    } | null
}

export function Footer({ data } : Props) {
    // console.log(data)
    const footerContentValue = data?.footerContent
    return (
      <div>
          {footerContentValue && <CustomPortableText value={footerContentValue} />}
      </div>
    )
}