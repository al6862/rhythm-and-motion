"use client"

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
import ScrollTrigger from "gsap/ScrollTrigger"

type HeroProps = {
  header: string;
  content: PortableTextBlock[];
  featuredImages: ImageData[];
  secondaryImages: ImageData[];
};

export default function Hero({ content }: { content: HeroProps }) {
  const { header, featuredImages, secondaryImages } = content

  gsap.registerPlugin(ScrollTrigger) 

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
            trigger: '.heroTwoCol',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: true,
        }
      })
      .to('.figure', {right: "0", translateX: "100%"}, "<")
      .to('.ampersand', {top: "8%"}, "<")
    
      gsap.timeline({
        scrollTrigger: {
            trigger: '.heroTwoCol',
            start: 'top top',
            end: 'center top',
            scrub: 1,
            markers: true,
            pin: '.leftImage',
        }
      })
      .to('.leftImage', {autoAlpha: 0})
    },
  );

  return (
    <div className="bg-blue">
      <div className="heroTwoCol h-screen relative">
        <div className="leftCol fixed top-0 p-[1.6rem] pr-[0.8rem] w-1/2 flex flex-col items-start">
          <div className="w-[88.5%]">
            <Rhythm />
          </div>
          <Image
            src={featuredImages[0].assetPath}
            alt={featuredImages[0].caption || "missing alt"}
            width={1440}
            height={1440}
            className="leftImage mt-4"
          />
        </div>
        <div className="absolute right-0 top-0 p-[1.6rem] pl-[0.8rem] w-1/2 flex flex-col items-end">
          <Image
            src={featuredImages[1].assetPath}
            alt={featuredImages[1].caption || "missing alt"}
            width={1440}
            height={1440}
            className="mb-4"
          />
          <div className="w-[88.5%]">
            <Motion />
          </div>
        </div>
        <div className="ampersand fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.3%]">
          <Ampersand />
        </div>
        <div className="figure fixed top-[1.6rem] right-1/2 translate-x-1/2 w-[7.1%]">
          <Figure />
        </div>
        {/* <h2>{header}</h2> */}
        {/* <CustomPortableText value={content.content} /> */}
      </div>
      {secondaryImages.map((image: ImageData, i: number) => {
        return (
          <Image
            src={image.assetPath}
            alt={image.caption || "missing alt"}
            height={1000}
            width={1000}
            key={i}
          />
        )
      })}
    </div>
  );
}
