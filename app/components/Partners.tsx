"use client";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";
import type { PartnersQueryResult } from "@/sanity.types";
import { PortableTextBlock } from "@portabletext/types";
import { useState, useEffect } from "react";
import { Link } from "./Link";
import { LinkValue } from "sanity-plugin-link-field";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
const formatTimeToLocal = (time24: string | null): string => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s/g, "");
};

type PartnersProps = {
  content: PartnersQueryResult["partners"];
};

type DanceStudio = NonNullable<
  NonNullable<PartnersQueryResult["partners"]>["studios"]
>[0];

export default function Partners({ content }: PartnersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hoveredStudioId, setHoveredStudioId] = useState<string | null>(null);
  const [activeStudio, setActiveStudio] = useState<DanceStudio | null>(null);

  const { header, image, studios, link } = content || {};

  useEffect(() => {
    const studioSlug = searchParams.get("studio");
    if (studioSlug && studios) {
      const studio = studios.find((s) => s.slug?.current === studioSlug);
      if (studio) {
        setActiveStudio(studio as unknown as DanceStudio);
      }
    } else {
      setActiveStudio(null);
      setHoveredStudioId(null);
    }
  }, [searchParams, studios]);

  const studiosByLocation = studios?.reduce(
    (acc, studio) => {
      if (!studio.location) return acc;
      if (!acc[studio.location]) {
        acc[studio.location] = [];
      }
      acc[studio.location].push(studio as unknown as DanceStudio);
      return acc;
    },
    {} as Record<string, DanceStudio[]>,
  );

  const handleStudioClick = (studio: DanceStudio) => {
    if (studio.slug?.current) {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.set("studio", studio.slug.current);
      router.push(`${pathname}?${urlSearchParams.toString()}`);
    }
  };

  return (
    <div className="grid">
      <div
        className={`sticky top-0 col-start-1 row-start-1 hidden h-screen w-screen overflow-hidden md:flex`}
      >
        <div className="md:relative md:size-full">
          {image?.assetPath && (
            <div
              className={`inset-0 hidden transition-opacity duration-500 md:absolute md:block ${activeStudio ? "opacity-0" : "opacity-100"}`}
            >
              <div className="after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%]">
                <Image
                  src={image.assetPath}
                  alt={image.caption || "missing alt"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex size-full flex-row items-center">
                <div className="h-screen w-1/3"></div>
                <div className="w-2/3 items-center justify-center text-white transition-all duration-500 md:flex">
                  <h1 className="text-center">{header}</h1>
                </div>
              </div>
            </div>
          )}

          {studios?.map(
            (studio) =>
              studio.image?.assetPath && (
                <div
                  key={studio._id}
                  className={`inset-0 hidden w-screen transition-all duration-500 md:absolute md:block ${
                    hoveredStudioId === studio._id
                      ? "opacity-100"
                      : activeStudio?._id === studio._id
                        ? "opacity-100"
                        : "opacity-0"
                  }`}
                >
                  <div
                    className={`after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%] ${
                      activeStudio?._id === studio._id
                        ? "after:backdrop-blur-md"
                        : ""
                    }`}
                  >
                    <Image
                      src={studio.image.assetPath}
                      alt={studio.image.caption || "missing alt"}
                      fill
                      className={`object-cover transition-all duration-500`}
                    />
                  </div>
                  <div className="relative flex size-full flex-row">
                    <div className="h-full w-1/3"></div>
                    <div className="inset-0 hidden w-2/3 items-center justify-center text-white transition-all duration-500 md:flex">
                      <div className="relative flex size-full flex-col items-center justify-center">
                        {activeStudio?.image?.assetPath && (
                          <div className="absolute right-0 top-[10%] z-10 mr-[5%] hidden overflow-hidden md:block lg:h-[200px] lg:w-[300px] 2xl:top-[6%] 2xl:h-[300px] 2xl:w-[375px]">
                            <Image
                              src={activeStudio.image.assetPath}
                              alt={activeStudio.image.caption || "missing alt"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        <p
                          className={`mr-[60%] transition-opacity duration-500 ${activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"}`}
                        >
                          {studio.header?.studioSubTitle}
                        </p>
                        <h1 className="max-w-[800px] py-[20px] text-center">
                          {studio.header?.studioTitle}
                        </h1>
                        <span
                          className={`ml-[45%] text-right transition-opacity duration-500 ${activeStudio?._id === studio._id ? "z-[200] opacity-100" : "pointer-events-none opacity-0"}`}
                        >
                          <CustomPortableText
                            value={
                              studio.studioAddress as unknown as PortableTextBlock[]
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
        className={`no-scrollbar z-20 col-start-1 row-start-1 grid w-full transition-all md:flex`}
      >
        {activeStudio && (
          <div className="sticky top-0 col-start-1 row-start-1 h-screen after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%] after:backdrop-blur-md xl:hidden">
            <Image
              src={activeStudio?.image?.assetPath || ""}
              alt={activeStudio?.image?.caption || "missing alt"}
              fill
              className="absolute inset-0 z-0 h-screen w-screen object-cover"
            />
          </div>
        )}
        <div
          className={`col-start-1 row-start-1 md:static md:left-0 md:top-0 md:min-h-screen md:w-1/3 md:pb-[16px] md:pl-[16px] md:pr-[30px] md:pt-[134px] ${activeStudio ? "bg-gray bg-opacity-[0.4] backdrop-blur-lg backdrop-brightness-[40%] backdrop-saturate-[1000%]" : "bg-orange-red"} `}
        >
          <div
            className={`relative z-10 flex flex-col gap-12 transition-all duration-500 ease-in-out max-md:px-[0.8rem] max-md:pb-[1.6rem] md:static md:py-0 ${activeStudio ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100"}`}
          >
            <h1 className="py-[80px] text-center text-white md:hidden">
              {header}
            </h1>
            {studiosByLocation &&
              Object.entries(studiosByLocation).map(([location, studios]) => {
                return (
                  <div key={location}>
                    <div className="flex flex-wrap gap-4">
                      <h2 className="text-white">{location}</h2>
                      <div className="flex size-[31px] shrink-0 items-center justify-center rounded-xl bg-white font-bold text-orange-red">
                        <p>{studios.length}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                      {studios?.map((studio) => {
                        return (
                          <div
                            key={studio._id}
                            className="group cursor-pointer text-white transition-all hover:bg-white hover:text-orange-red"
                            onMouseEnter={() =>
                              !activeStudio
                                ? setHoveredStudioId(studio._id)
                                : null
                            }
                            onMouseLeave={() =>
                              !activeStudio ? setHoveredStudioId(null) : null
                            }
                            onClick={() => handleStudioClick(studio)}
                          >
                            <div className="pointer-events-none  flex w-full flex-row flex-wrap items-center justify-between border-t border-dashed px-[16px] py-4">
                              <div>
                                <p className="font-bold">
                                  {studio.header?.studioTitle}
                                </p>
                                <CustomPortableText
                                  value={
                                    studio.studioAddress as unknown as PortableTextBlock[]
                                  }
                                />
                              </div>
                              {studio?.danceClasses?.length && (
                                <div className="mr-4 flex size-[31px] shrink-0 items-center justify-center rounded-xl bg-white font-bold text-orange-red group-hover:bg-orange-red group-hover:text-white">
                                  <p>{studio?.danceClasses.length}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            <Link link={link as LinkValue}>
              <button className="button">{link?.text}</button>
            </Link>
          </div>

          <div
            className={`relative z-10 transition-all duration-500 ease-in-out md:static ${!activeStudio ? "opacity-0" : "opacity-100"}`}
          >
            {studios?.map((studio) => (
              <div
                key={studio._id}
                className={` ${activeStudio?._id === studio._id ? "block" : "hidden"}`}
              >
                <span className="md:hidden">
                  <div
                    key={studio._id}
                    className={`transition-all duration-500 ${
                      activeStudio?._id === studio._id
                        ? "opacity-100"
                        : "hidden opacity-0"
                    }`}
                  >
                    <Image
                      src={studio.image?.assetPath || ""}
                      alt={studio.image?.caption || "missing alt"}
                      width={1000}
                      height={1000}
                      className="h-[314.4px] w-full object-cover"
                    />
                  </div>

                  <div className="relative mt-[120px] w-full">
                    <div className="inset-0 top-[150px] items-center justify-center text-white transition-all duration-500">
                      <div className="relative flex-col items-center">
                        <p
                          className={`absolute left-10 top-[-50px] transition-all duration-500 ${activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"}`}
                        >
                          {studio.header?.studioSubTitle}
                        </p>
                        <h1 className="inset-0 mx-[10px] text-center transition-all duration-500">
                          {studio.header?.studioTitle}
                        </h1>
                        <span
                          className={`absolute bottom-[-50px] right-10 text-right transition-all duration-500 ${activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"}`}
                        >
                          <CustomPortableText
                            value={
                              studio.studioAddress as unknown as PortableTextBlock[]
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </span>
                <div className="px-8 pb-[16px] pt-[100px] text-white md:py-0">
                  <button
                    onClick={() => router.push("/partners")}
                    className="mb-8 flex w-fit items-center gap-2 underline"
                  >
                    ← Back
                  </button>
                  {studio.studioDescription && (
                    <div className="pb-16">
                      <CustomPortableText
                        value={
                          studio.studioDescription as unknown as PortableTextBlock[]
                        }
                      />
                    </div>
                  )}
                  {studio.danceClasses && studio.danceClasses.length > 0 && (
                    <div>
                      {Object.entries(
                        studio.danceClasses.reduce(
                          (acc, danceClass) => {
                            const day = danceClass.dayOfWeek?.toString() || "0";
                            if (!acc[day]) {
                              acc[day] = [];
                            }
                            acc[day].push(danceClass);
                            return acc;
                          },
                          {} as Record<string, typeof studio.danceClasses>,
                        ),
                      )
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([day, classes]) => {
                          const dayNames = [
                            "Sundays",
                            "Mondays",
                            "Tuesdays",
                            "Wednesdays",
                            "Thursdays",
                            "Fridays",
                            "Saturdays",
                          ];
                          return (
                            <div key={day} className="mb-8">
                              <div className="flex flex-wrap gap-4">
                                <h2 className="text-white">
                                  {dayNames[parseInt(day)]}
                                </h2>
                                <div className="flex size-[31px] shrink-0 items-center justify-center rounded-xl bg-white font-bold text-black">
                                  <p>{classes.length}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex flex-col">
                                {classes.map((danceClass, index) => (
                                  <div
                                    key={index}
                                    className="group text-white transition-all"
                                  >
                                    <div className="mx-2 flex w-full flex-row items-center justify-between border-t border-dashed py-4">
                                      <div className="flex flex-col">
                                        <Link
                                          link={
                                            danceClass.classType as LinkValue
                                          }
                                          className="text-white underline"
                                        >
                                          {danceClass.classType?.text}
                                        </Link>
                                        <div className="flex gap-2">
                                          <span className="text-white">
                                            with
                                          </span>
                                          <Link
                                            link={
                                              danceClass.instructor as LinkValue
                                            }
                                            className="text-white underline"
                                          >
                                            {danceClass.instructor?.text}
                                          </Link>
                                        </div>
                                        <span className="text-white">
                                          {danceClass.mode}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-center rounded-xl bg-white px-4 py-2 font-bold">
                                        <p className={`text-black`}>
                                          {formatTimeToLocal(
                                            danceClass.startTime,
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      <div className="flex flex-col gap-4">
                        <Link link={studio.partnerSite as LinkValue}>
                          <button className="button">
                            {studio.partnerSite?.text}
                          </button>
                        </Link>
                        <Link link={studio.partnerLink as LinkValue}>
                          <button className="button">
                            {studio.partnerLink?.text}
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
