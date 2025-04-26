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
}

export default function SplitImageAndText({content}:{content: Props}) {
    const {layout, bgColor, textColor, image, header} = content
    return (
        <div className={`flex` + (layout == "right"? ` flex-row-reverse` : ``)} style={{backgroundColor: bgColor, color: textColor}}>
            <div className="shrink-0 relative w-[50vw] h-screen">
                <Image
                    src={image.assetPath}
                    alt={image.caption || "missing alt"}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-[6rem] flex items-center">
                {header && <h2>{header}</h2>}
                {content.content && <CustomPortableText value={content.content}/>}
            </div>
        </div>
    )
}