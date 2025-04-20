"use client";

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
import { HeroProps } from "./Hero";

export default function HeroDesktop({ content }: { content: HeroProps }) {
  const { header, featuredImages, secondaryImages } = content;
  const rhythmEle = useRef<HTMLDivElement>(null);
  const motionEle = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      if (rhythmEle.current) {
        gsap.set(".leftImage", {
          y: rhythmEle.current.offsetHeight,
          autoAlpha: 1,
        });
      }

      if (motionEle.current) {
        gsap.set(".rightImage", {
          y: -1 * motionEle.current.offsetHeight,
          autoAlpha: 1,
        });
      }

      gsap.set(".header", { y: "100vh", autoAlpha: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".heroTwoCol",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(".ampersand", { y: 0 }, "<")
        .to(".motion", { y: 0 }, "<")
        .to(".figure", { x: 0 }, "<")
        .to(".leftImage", { autoAlpha: 0 }, "<50%");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".heroHeader",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(".header", { y: 0 }, "<")
        .to(".rhythmAndMotion", { autoAlpha: 0 }, "<50%");
    }
  });

  return (
    <div className="overflow-hidden bg-blue">
      <div className="heroTwoCol h-screen">
        <div className="rhythmAndMotion fixed top-0 z-10 flex w-full gap-[4.7%]">
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
              sizes="(min-width: 768px) 100vw, 50vw"
              priority
              className="leftImage invisible object-cover pb-[1.6rem] pl-[1.6rem]"
            />
          </div>
          <div className="relative flex-1">
            <Image
              src={featuredImages[1].assetPath}
              alt={featuredImages[1].caption || "missing alt"}
              fill
              sizes="(min-width: 768px) 100vw, 50vw"
              priority
              className="rightImage invisible object-cover pr-[1.6rem] pt-[1.6rem]"
            />
          </div>
        </div>
        <div className="figure fixed left-full top-[1.6rem] z-10 w-[7.1%] translate-x-[calc(-1*(50%+50vw))]">
          <Figure />
        </div>
      </div>
      <div className="heroHeader absolute top-[50vh] h-[75vh]"></div>
      <div className="relative flex h-[150vh] items-center justify-center">
        <h2 className="z-10 max-w-[50rem] text-center text-white">{header}</h2>
        <div className="absolute bottom-28 right-32 z-10 max-w-[30.6rem] text-white">
          <CustomPortableText value={content.content} />
        </div>
        {secondaryImages[0] && (
          <Image
            src={secondaryImages[0].assetPath}
            alt={secondaryImages[0].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[12vw] top-0 w-[20vw] opacity-85"
          />
        )}
        {secondaryImages[1] && (
          <Image
            src={secondaryImages[1].assetPath}
            alt={secondaryImages[1].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[65vw] top-[15vh] w-[20vw] opacity-85"
          />
        )}
        {secondaryImages[2] && (
          <Image
            src={secondaryImages[2].assetPath}
            alt={secondaryImages[2].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[6vw] top-[70vh] w-[20vw] opacity-85"
          />
        )}
        {secondaryImages[3] && (
          <Image
            src={secondaryImages[3].assetPath}
            alt={secondaryImages[3].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[55vw] top-[100vh] w-[20vw] opacity-85"
          />
        )}
        {secondaryImages[4] && (
          <Image
            src={secondaryImages[4].assetPath}
            alt={secondaryImages[4].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[90vw] top-[35vh] w-[20vw] opacity-85"
          />
        )}
        {secondaryImages[5] && (
          <Image
            src={secondaryImages[5].assetPath}
            alt={secondaryImages[5].caption || "missing alt"}
            height={1000}
            width={1000}
            className="absolute left-[-17vw] top-[50vh] w-[20vw] opacity-85"
          />
        )}
      </div>
    </div>
  );
}
