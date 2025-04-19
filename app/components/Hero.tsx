"use client";

import { PortableTextBlock } from "next-sanity";
import { ImageData } from "../types";
import Rhythm from "./Rhythm";
import Ampersand from "./Ampersand";
import Motion from "./Motion";
import Figure from "./Figure";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

type HeroProps = {
  header: string;
  content: PortableTextBlock[];
  featuredImages: ImageData[];
  secondaryImages: ImageData[];
};

export default function Hero({ content }: { content: HeroProps }) {
  const { header, featuredImages, secondaryImages } = content;
  const rhythmEle = useRef<HTMLDivElement>(null);
  const motionEle = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (rhythmEle.current) {
      gsap.set(".leftImage", { y: rhythmEle.current.offsetHeight });
    }

    if (motionEle.current) {
      gsap.set(".rightImage", { y: -1 * motionEle.current.offsetHeight });
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".heroTwoCol",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          markers: true,
        },
      })
      .to(".ampersand", { y: 0 }, "<")
      .to(".motion", { y: 0 }, "<")
      .to(".figure", { x: 0 }, "<");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".heroTwoCol",
          start: "top top",
          end: "bottom center",
          scrub: 1,
          pin: ".leftImage",
          markers: true,
        },
      })
      .to(".leftImage", { autoAlpha: 0 }, "<");
  });

  return (
    <div className="bg-blue">
      <div className="heroTwoCol h-screen">
        <div className="fixed top-0 z-10 flex w-full gap-[4.7%]">
          <div ref={rhythmEle} className="rhythm flex-1 p-[1.6rem]">
            <Rhythm />
          </div>
          <div className="ampersand w-[4.3%] translate-y-[calc(50vh-50%)] py-[1.6rem]">
            <Ampersand />
          </div>
          <div
            ref={motionEle}
            className="motion flex-1 translate-y-[calc(100vh-100%)] p-[1.6rem]"
          >
            <Motion />
          </div>
        </div>
        <div className="flex size-full gap-[1.6rem]">
          <div className="relative flex-1">
            <Image
              src={featuredImages[0].assetPath}
              alt={featuredImages[0].caption || "missing alt"}
              fill
              className="leftImage object-cover pb-[1.6rem] pl-[1.6rem]"
            />
          </div>
          <div className="relative flex-1">
            <Image
              src={featuredImages[1].assetPath}
              alt={featuredImages[1].caption || "missing alt"}
              fill
              className="rightImage object-cover pr-[1.6rem] pt-[1.6rem]"
            />
          </div>
        </div>
        <div className="figure fixed left-full top-[1.6rem] z-10 w-[7.1%] translate-x-[calc(-1*(50%+50vw))]">
          <Figure />
        </div>
      </div>
      {secondaryImages.map((image: ImageData, i: number) => {
        return (
          <Image
            src={image.assetPath}
            alt={image.caption || "missing alt"}
            height={1000}
            width={1000}
            key={i}
            className="w-[30rem]"
          />
        );
      })}
    </div>
  );
}
