"use client";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";
import type { CommunityQueryResult } from "@/sanity.types";
import { PortableTextBlock } from "@portabletext/types";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Link } from "./Link";
import { LinkValue } from "sanity-plugin-link-field";

type CommunityProps = {
  content: CommunityQueryResult["community"];
};

type CommunityEvent = NonNullable<
  NonNullable<CommunityQueryResult["community"]>["events"]
>[0];

type SortedEvents = {
  when: string;
  datedEvents: CommunityEvent[];
}[];

export function categorizeEvents(events: CommunityEvent[]): SortedEvents {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents: CommunityEvent[] = [];
  const previousEvents: CommunityEvent[] = [];

  events.forEach((event) => {
    if (!event.startDate) return;

    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate >= today) {
      upcomingEvents.push(event);
    } else {
      previousEvents.push(event);
    }
  });

  return [
    { when: "Upcoming", datedEvents: upcomingEvents },
    { when: "Previous", datedEvents: previousEvents },
  ];
}

export function formatEventDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (startDate === endDate) {
    const dayOfWeek = start.toLocaleDateString("en-US", { weekday: "long" });
    const month = start.toLocaleDateString("en-US", { month: "long" });
    const date = start.getDate();
    const year = start.getFullYear();
    const suffix = getDateSuffix(date);

    return `${dayOfWeek}, ${month} ${date}${suffix}, ${year}`;
  }

  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
}

function getDateSuffix(date: number): string {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getDaysUntilEvent(startDate: string): { text: string; color: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(startDate);
  eventDate.setHours(0, 0, 0, 0);

  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let text = "";
  if (diffDays === 0) {
    text = "today";
  } else if (diffDays === 1) {
    text = "tomorrow";
  } else {
    text = `in ${diffDays} days`;
  }

  const color = diffDays > 1 ? "#02816C" : "#B77F3B";

  return { text, color };
}

export default function Community({ content }: CommunityProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [hoveredCommunityEventId, setHoveredCommunityEventId] = useState<
    string | null
  >(null);
  const [activeCommunityEvent, setActiveCommunityEvent] =
    useState<CommunityEvent | null>(null);
  const [sortedEvents, setsortedEvents] = useState<SortedEvents | null>(null);
  const { header, image, events, ctaLink } = content || {};

  useEffect(() => {
    if (!sortedEvents && events) {
      setsortedEvents(categorizeEvents(events));
    }
    const communityEventSlug = searchParams.get("communityEvent");
    if (communityEventSlug && events) {
      const communityEvent = events.find(
        (e) => e.slug?.current === communityEventSlug,
      );
      if (communityEvent) {
        setActiveCommunityEvent(communityEvent as unknown as CommunityEvent);
      }
    } else {
      setActiveCommunityEvent(null);
      setHoveredCommunityEventId(null);
    }
  }, [searchParams, events, sortedEvents]);

  const hoveredCommunityEvent = events?.find(
    (event) => event._id === hoveredCommunityEventId,
  );

  const handleCommunityEventClick = (communityEvent: CommunityEvent) => {
    if (communityEvent.slug?.current) {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.set("communityEvent", communityEvent.slug.current);
      router.push(`${pathname}?${urlSearchParams.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col xl:relative xl:flex-row">
      <div className="sticky top-0 h-screen w-full xl:h-screen">
        <div className="xl:relative xl:size-full">
          {events?.map((event) => (
            <div
              key={event._id}
              className={`absolute inset-0 transition-all duration-500 after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%] ${
                activeCommunityEvent?._id === event._id
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Image
                src={event.image?.assetPath || ""}
                alt={event.image?.caption || "missing alt"}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {image?.assetPath && (
            <div
              className={`inset-0 hidden transition-opacity duration-500 xl:absolute xl:block ${!activeCommunityEvent && hoveredCommunityEvent ? "opacity-0" : "opacity-100"}`}
            >
              <div className="after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%]">
                <Image
                  src={image.assetPath}
                  alt={image.caption || "missing alt"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full w-2/3">
                <div className="inset-0 hidden items-center justify-center text-white xl:absolute xl:flex">
                  <div className="text-center">
                    <h1>{header}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {events?.map(
            (event) =>
              event.image?.assetPath && (
                <div
                  key={event._id}
                  className={`inset-0 hidden transition-all duration-500 xl:absolute xl:block ${
                    hoveredCommunityEventId === event._id
                      ? "opacity-100"
                      : activeCommunityEvent?._id === event._id
                        ? "opacity-100"
                        : "opacity-0"
                  }`}
                >
                  <div
                    className={`after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%] ${
                      activeCommunityEvent?._id === event._id
                        ? "after:backdrop-blur-md"
                        : ""
                    }`}
                  >
                    <Image
                      src={event.image.assetPath}
                      alt={event.image.caption || "missing alt"}
                      fill
                      className={`object-cover transition-all duration-500`}
                    />
                  </div>
                  <div className="relative h-full w-2/3">
                    <div className="inset-0 hidden items-center justify-center text-white transition-all duration-500 xl:absolute xl:flex">
                      <div className="relative flex size-full flex-col items-center justify-center">
                        {activeCommunityEvent?.image?.assetPath && (
                          <div className="absolute right-0 top-[10%] z-10 mr-[5%] hidden overflow-hidden lg:h-[200px] lg:w-[300px] xl:block 2xl:top-[6%] 2xl:h-[300px] 2xl:w-[375px]">
                            <Image
                              src={activeCommunityEvent.image.assetPath}
                              alt={
                                activeCommunityEvent.image.caption ||
                                "missing alt"
                              }
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p
                          className={`mr-[60%] transition-opacity duration-500 ${activeCommunityEvent?._id === event._id ? "opacity-100" : "opacity-0"}`}
                        >
                          {event.startDate &&
                            event.endDate &&
                            formatEventDate(event.startDate, event.endDate)}
                        </p>
                        <h1 className="max-w-[800px] py-[20px] text-center">
                          {event.title}
                        </h1>
                        <span
                          className={`ml-[45%] text-right transition-opacity duration-500 ${activeCommunityEvent?._id === event._id ? "z-[200] opacity-100" : "pointer-events-none opacity-0"}`}
                        >
                          <CustomPortableText
                            value={
                              event.address as unknown as PortableTextBlock[]
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      <div
        className={`z-5 no-scrollbar absolute h-screen w-full overflow-y-scroll transition-all xl:right-0 xl:top-0 xl:h-full xl:w-1/3 xl:min-w-[493px] xl:pb-[16px] xl:pl-[16px] xl:pr-[30px] xl:pt-[134px] ${activeCommunityEvent ? "bg-black bg-opacity-[0.5] backdrop-blur-md backdrop-contrast-100 backdrop-saturate-[300%]" : "bg-blue"}`}
      >
        <div
          className={`pt-[100px] transition-all duration-500 ease-in-out xl:pt-0 ${!activeCommunityEvent ? "opacity-0" : "opacity-100"}`}
        >
          {activeCommunityEvent && (
            <div
              key={activeCommunityEvent._id}
              className={` ${activeCommunityEvent?._id === activeCommunityEvent._id ? "block" : "hidden"}`}
            >
              <span className="xl:hidden">
                <div
                  key={activeCommunityEvent._id}
                  className={`transition-all duration-500 ${
                    activeCommunityEvent?._id === activeCommunityEvent._id
                      ? "opacity-100"
                      : "hidden opacity-0"
                  }`}
                >
                  <Image
                    src={activeCommunityEvent.image?.assetPath || ""}
                    alt={activeCommunityEvent.image?.caption || "missing alt"}
                    width={1000}
                    height={1000}
                    className="h-[314.4px] w-full object-cover"
                  />
                </div>

                <div className="relative mt-[120px] w-full">
                  <div className="inset-0 top-[150px] items-center justify-center text-white transition-all duration-500">
                    <div className="relative flex-col items-center">
                      <p
                        className={`absolute left-10 top-[-50px] transition-all duration-500 ${activeCommunityEvent?._id === activeCommunityEvent._id ? "opacity-100" : "opacity-0"}`}
                      >
                        {activeCommunityEvent.startDate &&
                          activeCommunityEvent.endDate &&
                          formatEventDate(
                            activeCommunityEvent.startDate,
                            activeCommunityEvent.endDate,
                          )}
                      </p>
                      <h1 className="inset-0 mx-4 text-center transition-all duration-500">
                        {activeCommunityEvent.title}
                      </h1>
                      <span
                        className={`absolute bottom-[-50px] right-10 text-right transition-all duration-500 ${activeCommunityEvent?._id === activeCommunityEvent._id ? "opacity-100" : "opacity-0"}`}
                      >
                        <CustomPortableText
                          value={
                            activeCommunityEvent.address as unknown as PortableTextBlock[]
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </span>
              <div className="px-8 pb-[16px] pt-[100px] text-white xl:py-0">
                {activeCommunityEvent.content && (
                  <div className="mb-6 pb-16">
                    <CustomPortableText
                      value={
                        activeCommunityEvent.content as unknown as PortableTextBlock[]
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col gap-12 px-8 transition-all duration-500 ease-in-out xl:py-0 ${activeCommunityEvent ? "pt-0" : "opacity-100"}`}
        >
          <h1
            className={`py-[80px] text-center text-white xl:hidden ${
              activeCommunityEvent ? "hidden" : ""
            }`}
          >
            {header}
          </h1>
          {sortedEvents &&
            sortedEvents.map(({ when, datedEvents }) => {
              let topText = when;

              let length = datedEvents.length;

              if (
                activeCommunityEvent &&
                sortedEvents
                  .find((e) => e.when === "Upcoming")
                  ?.datedEvents.find((e) => e._id === activeCommunityEvent._id)
              ) {
                length = length - 1;
              }

              if (activeCommunityEvent) {
                topText = "More Events";
              }
              if (
                (activeCommunityEvent && when === "Previous") ||
                (activeCommunityEvent && datedEvents.length < 2)
              ) {
                return;
              } else {
                return (
                  <div key={when}>
                    <div className="flex gap-4">
                      <h2 className="text-white">{topText}</h2>
                      <div className="flex size-[31px] items-center justify-center rounded-xl bg-white font-bold text-black">
                        <p>{length}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                      {datedEvents?.map((event) => {
                        if (event._id !== activeCommunityEvent?._id) {
                          return (
                            <div
                              key={event._id}
                              className="group cursor-pointer text-white transition-all hover:bg-white hover:text-blue"
                              onMouseEnter={() =>
                                !activeCommunityEvent
                                  ? setHoveredCommunityEventId(event._id)
                                  : null
                              }
                              onMouseLeave={() =>
                                !activeCommunityEvent
                                  ? setHoveredCommunityEventId(null)
                                  : null
                              }
                              onClick={() => handleCommunityEventClick(event)}
                            >
                              <div className="flex w-full flex-row items-center justify-between border-t border-dashed px-[16px] py-4">
                                <div>
                                  <p className="font-bold">{event.title}</p>
                                  <p>
                                    {event.startDate &&
                                      event.endDate &&
                                      formatEventDate(
                                        event.startDate,
                                        event.endDate,
                                      )}
                                  </p>
                                  <p>{event.location}</p>
                                </div>
                                <div className="relative mr-6">
                                  {event.startDate && when === "Upcoming" && (
                                    <div
                                      className={`rounded-xl px-4 py-2 font-bold text-white`}
                                      style={{
                                        backgroundColor: getDaysUntilEvent(
                                          event.startDate,
                                        ).color,
                                      }}
                                    >
                                      {getDaysUntilEvent(event.startDate).text}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              }
            })}
        </div>

        {activeCommunityEvent && (
          <div className="pt-16">
            <Link link={ctaLink as LinkValue}>
              <button className="button">{ctaLink?.text}</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
