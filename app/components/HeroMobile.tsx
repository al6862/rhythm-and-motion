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
import { HeroProps } from "./Hero";

export default function HeroMobile({ content }: { content: HeroProps }) {
  const { featuredImages, secondaryImages } = content;

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (window.innerWidth < 768) {
      gsap.set(".header", { y: "100vh", autoAlpha: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".heroTwoColMobile",
            start: "top top",
            end: "bottom top",
            pin: '.bluePanel',
            scrub: 1,
          },
        })
        .to(".rhythmAndMotionMobile", { y: 0 }, "<")
        .to(".figureMobile", { autoAlpha: 0 }, "<");
  
      gsap
      .timeline({
        scrollTrigger: {
          trigger: ".bluePanel",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .to(".header", { y: 0, ease: 'none' }, "<")
      .set(".heroTwoColMobile", { autoAlpha: 0 });
    }
  })

  return (
    <div>
      <div className="heroTwoColMobile h-screen relative -z-10">
        <div className="rhythmAndMotionMobile fixed top-0 translate-y-[calc(50vh-50%)] z-10 flex w-full gap-[4.7%]">
          <div className="flex-1 p-[1.6rem]">
            <Rhythm />
          </div>
          <div className="w-[4.3%] py-[1.6rem]">
            <Ampersand />
          </div>
          <div className="flex-1 p-[1.6rem]">
            <Motion />
          </div>
        </div>
        <div className="figureMobile fixed left-1/2 -translate-x-1/2 bottom-[55vh] z-10 w-[26.9vw]">
          <Figure />
        </div>
        <div className="fixed top-0 size-full flex flex-col">
          <div className="relative flex-1">
            <Image
              src={featuredImages[0].assetPath}
              alt={featuredImages[0].caption || "missing alt"}
              fill
              sizes="(max-width: 768px) 200vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="relative flex-1">
            <Image
              src={featuredImages[1].assetPath}
              alt={featuredImages[1].caption || "missing alt"}
              fill
              sizes="(max-width: 768px) 200vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="bluePanel bg-blue h-screen relative">
        <div className="pt-[5.2rem] px-[1.6rem] flex gap-[2rem] overflow-x-scroll scrollbar-width-none">
          {secondaryImages[0] && (
            <Image
              src={secondaryImages[0].assetPath}
              alt={secondaryImages[0].caption || "missing alt"}
              height={1000}
              width={520}
              className="pt-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
          {secondaryImages[1] && (
            <Image
              src={secondaryImages[1].assetPath}
              alt={secondaryImages[1].caption || "missing alt"}
              height={1000}
              width={520}
              className="pb-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
          {secondaryImages[2] && (
            <Image
              src={secondaryImages[2].assetPath}
              alt={secondaryImages[2].caption || "missing alt"}
              height={1000}
              width={520}
              className="pt-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
          {secondaryImages[3] && (
            <Image
              src={secondaryImages[3].assetPath}
              alt={secondaryImages[3].caption || "missing alt"}
              height={1000}
              width={520}
              className="pb-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
          {secondaryImages[4] && (
            <Image
              src={secondaryImages[4].assetPath}
              alt={secondaryImages[4].caption || "missing alt"}
              height={1000}
              width={520}
              className="pt-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
          {secondaryImages[5] && (
            <Image
              src={secondaryImages[5].assetPath}
              alt={secondaryImages[5].caption || "missing alt"}
              height={1000}
              width={520}
              className="pb-[7.8rem] opacity-85 w-[26rem]"
            />
          )}
        </div>
        <div className="mt-[5.8rem] px-[4.3rem] text-white text-center">
          <CustomPortableText value={content.content} />
        </div>
      </div>
    </div>
  );
}
