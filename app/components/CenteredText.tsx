import { type PortableTextBlock } from "next-sanity";
import { CustomPortableText } from "./CustomPortableText";

type Props = {
  content: PortableTextBlock[];
};

export default function CenteredText({ content }: Props) {
  return (
    <div>
      {content && (
        <div className={`rte`}>
          <CustomPortableText value={content} />
        </div>
      )}
    </div>
  );
}
