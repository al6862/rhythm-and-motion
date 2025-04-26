import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import Image from "next/image";

type Props = {
    image: ImageData;
    header: string;
    content: PortableTextBlock[];
    layout: string;
}

export default function SplitImageAndText({content}:{content: Props}) {
    const {image, header, layout} = content
    return (
        <div className={`flex`}>
            <div className="relative w-[50vw] h-screen">
                <Image
                    src={image.assetPath}
                    alt={image.caption || "missing alt"}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <h2>{header}</h2>
            </div>
        </div>
    )
}