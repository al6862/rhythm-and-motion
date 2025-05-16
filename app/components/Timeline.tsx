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
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";

type TimelineProps = Extract<
  NonNullable<NonNullable<NonNullable<PageQueryResult>["page"]>["content"]>[0],
  { _type: "timeline" }
>;

type EventContentProps = NonNullable<TimelineProps["events"]>[0];

const Event = ({
  eventContent,
  index,
  activeIndex,
  onText,
  onStart,
}: {
  eventContent: EventContentProps;
  index: number;
  activeIndex: number;
  onText: boolean;
  onStart: boolean;
}) => {
  const { title, description, content, coverImage, secondaryImage } =
    eventContent;
  const overlayRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const [overlayIsHidden, setOverlayIsHidden] = useState(true);
  const handleClick = () => {
    setOverlayIsHidden(!overlayIsHidden);
  };

  useGSAP(() => {
    gsap.set(overlayRef.current, { autoAlpha: 0 });
  });

  useGSAP(
    () => {
      if (window.innerWidth < 1024) {
        if (overlayIsHidden) {
          gsap.timeline().to(overlayRef.current, { autoAlpha: 0 }, "<");
        } else {
          gsap.timeline().to(overlayRef.current, { autoAlpha: 1 }, "<");
        }
      } else {
        if (overlayIsHidden) {
          gsap
            .timeline()
            .to(overlayContentRef.current, {
              y: -100,
              x: -100,
              ease: "elastic.out(1,0.5) ",
              duration: 2,
            })
            .to(overlayRef.current, { autoAlpha: 0 }, "<")
            .to(
              imageRef.current,
              { y: 0, x: 0, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              titleRef.current,
              { y: 0, x: 0, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              textContainerRef.current,
              { y: 0, x: 0, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            );
        } else {
          gsap
            .timeline()
            .to(textContainerRef.current, {
              y: 100,
              x: 100,
              ease: "elastic.out(1,0.5) ",
              duration: 2,
            })
            .to(overlayRef.current, { autoAlpha: 1 }, "<")
            .to(
              imageRef.current,
              { y: 100, x: 100, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              titleRef.current,
              { y: 100, x: 100, ease: "elastic.out(1,0.5)", duration: 2 },
              "<",
            )
            .to(
              overlayContentRef.current,
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

  useEffect(() => {
    if (window.innerWidth < 1024) {
      if (textRef.current && onText && activeIndex == index) {
        const { scrollX, scrollY } = window;
        textRef.current.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      } else if (imageRef.current && !onText && activeIndex == index) {
        const { scrollX, scrollY } = window;
        imageRef.current.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      }
    } else {
      if (eventRef.current && activeIndex == index) {
        const { scrollX, scrollY } = window;
        eventRef.current.scrollIntoView({
          inline: "start",
          behavior: "smooth",
        });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      }
    }
  }, [index, activeIndex, onText, onStart]);

  return (
    <div ref={eventRef} className="shrink-0">
      {title && (
        <div className="pl-[28.7rem] 2xl:pl-[38rem]">
          <h3
            ref={titleRef}
            className="relative z-10 pb-[3.7rem] after:absolute after:inset-x-0 after:bottom-0 after:border-l after:border-dashed after:pb-[3.7rem] after:content-['']"
          >
            {title}
          </h3>
        </div>
      )}
      <div className="border-t border-dashed pl-[28.7rem] 2xl:pl-[38rem]">
        <div
          ref={textContainerRef}
          className="relative z-10 flex h-[50vh] gap-20 pt-[3.7rem] after:absolute after:inset-x-0 after:top-0 after:border-l after:border-dashed after:pb-[3.7rem] after:content-['']"
        >
          {description && (
            <div ref={textRef} className="max-w-[30.6rem] text-white">
              <CustomPortableText value={description as PortableTextBlock[]} />
            </div>
          )}
          {coverImage && coverImage.assetPath && (
            <Image
              ref={imageRef}
              src={coverImage.assetPath}
              alt={coverImage.caption || "missing alt"}
              width={800}
              height={1000}
              className="z-10 w-[40rem] cursor-pointer object-contain max-lg:translate-y-[-7.4rem]"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      <div
        ref={overlayRef}
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
            <div
              ref={overlayContentRef}
              className="overlayContent flex translate-x-[-100px] translate-y-[-100px] gap-16 pr-[1.6rem]"
            >
              {description && (
                <CustomPortableText
                  value={description as PortableTextBlock[]}
                />
              )}
              {content && (
                <CustomPortableText value={content as PortableTextBlock[]} />
              )}
            </div>
          </div>

          {title && (
            <div className="absolute left-[13.6rem] flex h-[50vh] items-end pb-[12.5rem] lg:left-[27.3rem] xl:left-[54.6rem]">
              <h1>{title}</h1>
            </div>
          )}
          {secondaryImage && secondaryImage.assetPath && (
            <div className="absolute right-[22rem] top-[16.5rem] flex items-end gap-[1.6rem]">
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
          <span
            className="absolute right-32 top-[12.5rem] cursor-pointer"
            onClick={handleClick}
          >
            Back
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Timeline({ content }: { content: TimelineProps }) {
  const { header, events, link } = content;
  let lastIndex = 0;
  if (events) {
    lastIndex = events.length - 1;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [onStart, setOnStart] = useState(true);
  const [onText, setOnText] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const handlePrevClick = () => {
    if (window.innerWidth < 1024) {
      if (events && activeIndex > -1) {
        if (activeIndex == 0 && onText) {
          setOnStart(true);
        } else {
          if (onText) {
            setActiveIndex(activeIndex - 1);
          }
          setOnText(!onText);
        }
      }
    } else {
      if (events && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  };
  const handleNextClick = () => {
    if (window.innerWidth < 1024) {
      if (events && activeIndex < events.length) {
        if (onStart) {
          setActiveIndex(0);
          setOnText(true);
          setOnStart(false);
        } else {
          if (!onText) {
            setActiveIndex(activeIndex + 1);
          }
          setOnText(!onText);
        }
      }
    } else {
      if (events && activeIndex < events.length) {
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      if (buttonRef.current && activeIndex == lastIndex + 1) {
        const { scrollX, scrollY } = window;
        buttonRef.current.scrollIntoView({ inline: "end", behavior: "smooth" });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      } else if (logoRef.current && onStart) {
        const { scrollX, scrollY } = window;
        logoRef.current.scrollIntoView({ inline: "end", behavior: "smooth" });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      }
    } else {
      if (buttonRef.current && activeIndex == lastIndex + 1) {
        const { scrollX, scrollY } = window;
        buttonRef.current.scrollIntoView({ inline: "end", behavior: "smooth" });
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: "instant",
        });
      }
    }
  }, [activeIndex, onStart, lastIndex]);

  return (
    <div className="no-scrollbar overflow-x-scroll bg-brown text-white">
      <div className="relative flex h-screen w-max items-end">
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
                  activeIndex={activeIndex}
                  onText={onText}
                  onStart={onStart}
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
            <span className="button">
              <Link link={link as LinkValue}>{link.text}</Link>
            </span>
          </div>
        )}
      </div>
      <div
        onClick={handlePrevClick}
        className="absolute left-0 top-0 h-screen w-1/2"
      ></div>
      <div
        onClick={handleNextClick}
        className="absolute right-0 top-0 h-screen w-1/2"
      ></div>
    </div>
  );
}
