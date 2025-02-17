import { CustomPortableText } from "./CustomPortableText";

export default function CenteredText({ content }) {
  return (
    <div>
      {content.content && (
        <div className={`rte`}>
          <CustomPortableText value={content.content} />
        </div>
      )}
    </div>
  );
}
