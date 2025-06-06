"use client";

import { PageQueryResult } from "@/sanity.types";
import { Link } from "./Link";
import { LinkValue } from "sanity-plugin-link-field";
import { CustomPortableText } from "./CustomPortableText";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import LogoHistory from "./LogoHistory";
import Figure from "./Figure";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import React from "react";

type TimelineProps = Extract<
  NonNullable<NonNullable<NonNullable<PageQueryResult>["page"]>["content"]>[0],
  { _type: "timeline" }
>;

type EventContentProps = NonNullable<TimelineProps["events"]>[0];

const Event = ({
  eventContent,
  index,
  overlayIsHidden,
  setOverlayIsHidden,
  setActiveIndex,
}: {
  eventContent: EventContentProps;
  index: number;
  overlayIsHidden: boolean;
  setOverlayIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { title, description, coverImage } = eventContent;
  const handleClick = () => {
    setActiveIndex(index);
    setOverlayIsHidden(!overlayIsHidden);
  };

  useGSAP(() => {
    gsap.set("#eventOverlay-" + index, { autoAlpha: 0 });
  });

  return (
    <div id={`event-` + index} className="shrink-0">
      {title && (
        <div className="pl-[28.7rem] 2xl:pl-[38rem]">
          <h3 className="title relative z-10 pb-[3.7rem] after:absolute after:inset-x-0 after:bottom-0 after:border-l after:border-dashed after:pb-[3.7rem] after:content-['']">
            {title}
          </h3>
        </div>
      )}
      <div className="border-t border-dashed pl-[28.7rem] 2xl:pl-[38rem]">
        <div className="textImage relative z-10 flex h-[50vh] gap-20 pt-[3.7rem] after:absolute after:inset-x-0 after:top-0 after:border-l after:border-dashed after:pb-[3.7rem] after:content-['']">
          {description && (
            <div className="max-w-[30.6rem] text-white">
              <CustomPortableText value={description as PortableTextBlock[]} />
            </div>
          )}
          {coverImage && coverImage.assetPath && (
            <Image
              src={coverImage.assetPath}
              alt={coverImage.caption || "missing alt"}
              width={800}
              height={1000}
              className="z-10 w-[40rem] cursor-pointer object-contain max-lg:translate-y-[-7.4rem] lg:pb-32"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const EventOverlay = ({
  eventContent,
  index,
  overlayIsHidden,
  setOverlayIsHidden,
}: {
  eventContent: EventContentProps;
  index: number;
  overlayIsHidden: boolean;
  setOverlayIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { title, description, content, coverImage, secondaryImage } =
    eventContent;
  const handleClick = () => {
    setOverlayIsHidden(!overlayIsHidden);
  };

  return (
    <div
      id={`eventOverlay-` + index}
      className="invisible fixed left-0 top-0 z-20 h-screen w-screen overflow-auto bg-brown text-white md:overflow-hidden"
    >
      <div className="md:hidden">
        <div className="relative">
          {coverImage && coverImage.assetPath && (
            <Image
              src={coverImage.assetPath}
              alt={coverImage.caption || "missing alt"}
              width={1600}
              height={2000}
              className="w-full"
            />
          )}
          {title && (
            <div className="absolute left-[1.6rem] top-1/2 -translate-y-1/2">
              <h1>{title}</h1>
            </div>
          )}
          <span
            className="absolute right-[1.6rem] top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleClick}
          >
            Back
          </span>
        </div>
        <div className="flex -translate-y-24 flex-col gap-16 px-[4.4rem]">
          {description && (
            <CustomPortableText value={description as PortableTextBlock[]} />
          )}
          {secondaryImage && secondaryImage.assetPath && (
            <div className="flex justify-end gap-[1.6rem]">
              <p className="caption h-fit max-w-44 self-end italic before:content-['('] after:content-[')']">
                {secondaryImage.caption}
              </p>
              <Image
                src={secondaryImage.assetPath}
                alt={secondaryImage.caption || "missing alt"}
                width={240}
                height={320}
                className="w-48 object-contain"
              />
            </div>
          )}
          {content && (
            <CustomPortableText value={content as PortableTextBlock[]} />
          )}
        </div>
      </div>
      <div className="max-md:hidden">
        {coverImage && coverImage.assetPath && (
          <Image
            src={coverImage.assetPath}
            alt={coverImage.caption || "missing alt"}
            width={800}
            height={1000}
            className="absolute left-32 top-1/2 w-[40rem] -translate-y-1/2 object-contain"
          />
        )}
        <div className="absolute left-[19rem] top-1/2 flex gap-16 xl:left-[38rem]">
          <div className="overlayContent flex translate-x-[-100px] translate-y-[-100px] gap-16 pr-[1.6rem]">
            {description && (
              <CustomPortableText value={description as PortableTextBlock[]} />
            )}
            {content && (
              <CustomPortableText value={content as PortableTextBlock[]} />
            )}
          </div>
        </div>

        {title && (
          <div className="absolute left-12 flex h-[50vh] items-end pb-[12.5rem] lg:left-40 xl:left-[34rem] 2xl:left-[54.6rem]">
            <h1>{title}</h1>
          </div>
        )}
        {secondaryImage && secondaryImage.assetPath && (
          <div className="absolute right-12 top-[16.5rem] flex items-end gap-[1.6rem] lg:right-[22rem]">
            <p className="caption max-w-44 italic before:content-['('] after:content-[')']">
              {secondaryImage.caption}
            </p>
            <Image
              src={secondaryImage.assetPath}
              alt={secondaryImage.caption || "missing alt"}
              width={240}
              height={320}
              className="w-48 object-contain"
            />
          </div>
        )}
        <button
          className="absolute right-32 top-[12.5rem] cursor-pointer"
          onClick={handleClick}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default function Timeline({ content }: { content: TimelineProps }) {
  const { header, events, link } = content;
  const timelineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [overlayIsHidden, setOverlayIsHidden] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(timelineRef.current, {
      xPercent: -100,
      x: () => window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        pin: true,
        end: () => `+=${timelineRef.current?.offsetWidth} bottom`,
        scrub: 1,
      },
    });
  });

  useGSAP(
    () => {
      if (window.innerWidth < 1024) {
        if (overlayIsHidden) {
          gsap
            .timeline()
            .to("#eventOverlay-" + activeIndex, { autoAlpha: 0 }, "<");
        } else {
          gsap
            .timeline()
            .to("#eventOverlay-" + activeIndex, { autoAlpha: 1 }, "<");
        }
      } else {
        if (overlayIsHidden) {
          gsap
            .timeline()
            .to("#eventOverlay-" + activeIndex + " .overlayContent", {
              y: -100,
              x: -100,
              ease: "elastic.out(1,0.5) ",
              duration: 2,
            })
            .to("#eventOverlay-" + activeIndex, { autoAlpha: 0 }, "<")
            .to(
              "#event-" + activeIndex + " .title",
              { y: 0, x: 0, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              "#event-" + activeIndex + " .textImage",
              { y: 0, x: 0, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            );
        } else {
          gsap
            .timeline()
            .to("#event-" + activeIndex + " .textImage", {
              y: 100,
              x: 100,
              ease: "elastic.out(1,0.5) ",
              duration: 2,
            })
            .to("#eventOverlay-" + activeIndex, { autoAlpha: 1 }, "<")
            .to(
              "#event-" + activeIndex + " .title",
              { y: 100, x: 100, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              "#eventOverlay-" + activeIndex + " .overlayContent",
              { y: 0, x: 0, ease: "elastic.out(1,0.5) ", duration: 2 },
              "<",
            );
        }
      }
    },
    { dependencies: [overlayIsHidden] },
  );

  useEffect(() => {
    if (overlayIsHidden) {
      document.body.classList.remove("overflow-hidden");
    } else {
      document.body.classList.add("overflow-hidden");
    }
  }, [overlayIsHidden]);

  return (
    <div className="no-scrollbar overflow-x-scroll bg-brown text-white">
      {events &&
        events.map((event, i) => {
          return (
            <EventOverlay
              eventContent={event}
              key={i}
              index={i}
              overlayIsHidden={overlayIsHidden}
              setOverlayIsHidden={setOverlayIsHidden}
            />
          );
        })}
      <div ref={timelineRef} className="relative flex h-screen w-max items-end">
        <div
          ref={logoRef}
          className="absolute left-[2.2rem] flex h-[50vh] w-[22.5rem] items-end pb-16 lg:top-0 2xl:left-12 2xl:w-[30rem]"
        >
          <LogoHistory />
        </div>
        {header && (
          <h1 className="absolute left-[3.4rem] top-0 z-10 flex h-[50vh] max-w-2xl items-end pb-[6.9rem] max-lg:max-w-[22.4rem] lg:left-[64.3rem] lg:pb-[1.6rem] 2xl:left-[73.6rem]">
            {header}
          </h1>
        )}
        <div className="flex items-end after:h-[calc(50vh+1px)] after:border-t after:border-dashed after:pr-[67.6rem] after:content-['']">
          {events &&
            events.map((event, i) => {
              return (
                <Event
                  eventContent={event}
                  key={i}
                  index={i}
                  overlayIsHidden={overlayIsHidden}
                  setOverlayIsHidden={setOverlayIsHidden}
                  setActiveIndex={setActiveIndex}
                />
              );
            })}
        </div>
        <div className="absolute bottom-0 right-0 mb-[16.7rem] mr-[28.7rem] h-[50vh] w-[35.4rem] 2xl:mr-[40.4rem]">
          <Figure />
        </div>
        {link && (
          <div
            ref={buttonRef}
            className="absolute bottom-0 right-0 z-10 pb-12 pr-12"
          >
            <Link link={link as LinkValue}>
              <button className="button">{link.text}</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
