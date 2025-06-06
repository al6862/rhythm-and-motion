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

  const hoveredStudio = studios?.find(
    (studio) => studio._id === hoveredStudioId,
  );

  const handleStudioClick = (studio: DanceStudio) => {
    if (studio.slug?.current) {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.set("studio", studio.slug.current);
      router.push(`${pathname}?${urlSearchParams.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col md:relative md:flex-row">
      <div
        className="sticky top-0 flex h-screen w-full cursor-pointer md:h-screen"
        onClick={() => router.push(`${pathname}`)}
      >
        <div className="md:relative md:size-full">
          {studios?.map((studio) => (
            <div
              key={studio._id}
              className={`absolute inset-0 transition-all duration-500 after:absolute after:inset-0 after:bg-black after:bg-opacity-[25%] ${
                activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={studio.image?.assetPath || ""}
                alt={studio.image?.caption || "missing alt"}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {image?.assetPath && (
            <div
              className={`inset-0 hidden transition-opacity duration-500 md:absolute md:block ${!activeStudio && hoveredStudio ? "opacity-0" : "opacity-100"}`}
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
                <div className="w-1/3"></div>
                <div className="w-2/3 text-white">
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
                  className={`inset-0 hidden transition-all duration-500 md:absolute md:block ${
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
                          <div className="absolute right-0 top-[10%] z-10 mr-[5%] hidden overflow-hidden drop-shadow-md md:block lg:h-[200px] lg:w-[300px] 2xl:top-[3%] 2xl:h-[300px] 2xl:w-[375px]">
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
                        <h1 className="max-w-[600px] py-[20px] text-center">
                          {studio.header?.studioTitle}
                        </h1>
                        <span
                          className={`ml-[45%] text-right transition-opacity duration-500 ${activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"}`}
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
        className={`z-5 no-scrollbar absolute h-screen w-full overflow-y-scroll transition-all md:md:left-0 md:top-0 md:h-full md:w-1/3 md:pb-[16px] md:pl-[16px] md:pr-[30px] md:pt-[134px] ${activeStudio ? "bg-black bg-opacity-[0.5] backdrop-blur-md backdrop-contrast-100 backdrop-saturate-[300%]" : "bg-orange-red"}`}
      >
        <div
          className={`flex flex-col gap-12 px-8 py-[100px] transition-all duration-500 ease-in-out md:py-0 ${activeStudio ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100"}`}
        >
          <h1 className="text-center text-white md:hidden">{header}</h1>
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
                          <div className="relative w-full">
                            <svg
                              className="w-full"
                              height="1"
                              viewBox="0 0 447 1"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M447 0.046875H436.217V1.04688H447V0.046875ZM434.257 0.046875H412.691V1.04688H434.257V0.046875ZM410.73 0.046875H389.164V1.04688H410.73V0.046875ZM387.204 0.046875H365.638V1.04688H387.204V0.046875ZM363.678 0.046875H342.112V1.04688H363.678V0.046875ZM340.151 0.046875H318.586V1.04688H340.151V0.046875ZM316.625 0.046875H295.059V1.04688H316.625V0.046875ZM293.099 0.046875H271.533V1.04688H293.099V0.046875ZM269.572 0.046875H248.007V1.04688H269.572V0.046875ZM246.046 0.046875H224.48V1.04688H246.046V0.046875ZM222.52 0.046875H200.954V1.04688H222.52V0.046875ZM198.993 0.046875H177.428V1.04688H198.993V0.046875ZM175.467 0.046875H153.901V1.04688H175.467V0.046875ZM151.941 0.046875H130.375V1.04688H151.941V0.046875ZM128.414 0.046875H106.849V1.04688H128.414V0.046875ZM104.888 0.046875H83.3223V1.04688H104.888V0.046875ZM81.3617 0.046875H59.7959V1.04688H81.3617V0.046875ZM57.8354 0.046875H36.2696V1.04688H57.8354V0.046875ZM34.3091 0.046875H12.7433V1.04688H34.3091V0.046875ZM10.7827 0.046875H0V1.04688H10.7827V0.046875ZM447 -0.453125H436.217V1.54688H447V-0.453125ZM434.257 -0.453125H412.691V1.54688H434.257V-0.453125ZM410.73 -0.453125H389.164V1.54688H410.73V-0.453125ZM387.204 -0.453125H365.638V1.54688H387.204V-0.453125ZM363.678 -0.453125H342.112V1.54688H363.678V-0.453125ZM340.151 -0.453125H318.586V1.54688H340.151V-0.453125ZM316.625 -0.453125H295.059V1.54688H316.625V-0.453125ZM293.099 -0.453125H271.533V1.54688H293.099V-0.453125ZM269.572 -0.453125H248.007V1.54688H269.572V-0.453125ZM246.046 -0.453125H224.48V1.54688H246.046V-0.453125ZM222.52 -0.453125H200.954V1.54688H222.52V-0.453125ZM198.993 -0.453125H177.428V1.54688H198.993V-0.453125ZM175.467 -0.453125H153.901V1.54688H175.467V-0.453125ZM151.941 -0.453125H130.375V1.54688H151.941V-0.453125ZM128.414 -0.453125H106.849V1.54688H128.414V-0.453125ZM104.888 -0.453125H83.3223V1.54688H104.888V-0.453125ZM81.3617 -0.453125H59.7959V1.54688H81.3617V-0.453125ZM57.8354 -0.453125H36.2696V1.54688H57.8354V-0.453125ZM34.3091 -0.453125H12.7433V1.54688H34.3091V-0.453125ZM10.7827 -0.453125H0V1.54688H10.7827V-0.453125Z"
                                fill="white"
                                mask="url(#path-1-inside-1_258_855)"
                              />
                            </svg>
                          </div>
                          <div className="my-4 flex w-full flex-row flex-wrap items-center justify-between">
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
          className={`transition-all duration-500 ease-in-out ${!activeStudio ? "opacity-0" : "opacity-100"}`}
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

                <div className="relative mt-[80px] w-full">
                  <div className="inset-0 top-[150px] items-center justify-center text-white transition-all duration-500">
                    <div className="relative flex-col items-center">
                      <p
                        className={`absolute left-10 top-[-50px] transition-all duration-500 ${activeStudio?._id === studio._id ? "opacity-100" : "opacity-0"}`}
                      >
                        {studio.header?.studioSubTitle}
                      </p>
                      <h1 className="inset-0 mx-[100px] text-center transition-all duration-500">
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
              <div className="px-8 py-[100px] text-white md:py-0">
                {studio.studioDescription && (
                  <div className="mb-6">
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
                                  <div className="relative w-full">
                                    <svg
                                      className="w-full"
                                      height="1"
                                      viewBox="0 0 447 1"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      preserveAspectRatio="none"
                                    >
                                      <path
                                        d="M447 0.046875H436.217V1.04688H447V0.046875ZM434.257 0.046875H412.691V1.04688H434.257V0.046875ZM410.73 0.046875H389.164V1.04688H410.73V0.046875ZM387.204 0.046875H365.638V1.04688H387.204V0.046875ZM363.678 0.046875H342.112V1.04688H363.678V0.046875ZM340.151 0.046875H318.586V1.04688H340.151V0.046875ZM316.625 0.046875H295.059V1.04688H316.625V0.046875ZM293.099 0.046875H271.533V1.04688H293.099V0.046875ZM269.572 0.046875H248.007V1.04688H269.572V0.046875ZM246.046 0.046875H224.48V1.04688H246.046V0.046875ZM222.52 0.046875H200.954V1.04688H222.52V0.046875ZM198.993 0.046875H177.428V1.04688H198.993V0.046875ZM175.467 0.046875H153.901V1.04688H175.467V0.046875ZM151.941 0.046875H130.375V1.04688H151.941V0.046875ZM128.414 0.046875H106.849V1.04688H128.414V0.046875ZM104.888 0.046875H83.3223V1.04688H104.888V0.046875ZM81.3617 0.046875H59.7959V1.04688H81.3617V0.046875ZM57.8354 0.046875H36.2696V1.04688H57.8354V0.046875ZM34.3091 0.046875H12.7433V1.04688H34.3091V0.046875ZM10.7827 0.046875H0V1.04688H10.7827V0.046875ZM447 -0.453125H436.217V1.54688H447V-0.453125ZM434.257 -0.453125H412.691V1.54688H434.257V-0.453125ZM410.73 -0.453125H389.164V1.54688H410.73V-0.453125ZM387.204 -0.453125H365.638V1.54688H387.204V-0.453125ZM363.678 -0.453125H342.112V1.54688H363.678V-0.453125ZM340.151 -0.453125H318.586V1.54688H340.151V-0.453125ZM316.625 -0.453125H295.059V1.54688H316.625V-0.453125ZM293.099 -0.453125H271.533V1.54688H293.099V-0.453125ZM269.572 -0.453125H248.007V1.54688H269.572V-0.453125ZM246.046 -0.453125H224.48V1.54688H246.046V-0.453125ZM222.52 -0.453125H200.954V1.54688H222.52V-0.453125ZM198.993 -0.453125H177.428V1.54688H198.993V-0.453125ZM175.467 -0.453125H153.901V1.54688H175.467V-0.453125ZM151.941 -0.453125H130.375V1.54688H151.941V-0.453125ZM128.414 -0.453125H106.849V1.54688H128.414V-0.453125ZM104.888 -0.453125H83.3223V1.54688H104.888V-0.453125ZM81.3617 -0.453125H59.7959V1.54688H81.3617V-0.453125ZM57.8354 -0.453125H36.2696V1.54688H57.8354V-0.453125ZM34.3091 -0.453125H12.7433V1.54688H34.3091V-0.453125ZM10.7827 -0.453125H0V1.54688H10.7827V-0.453125Z"
                                        fill="white"
                                        mask="url(#path-1-inside-1_258_855)"
                                      />
                                    </svg>
                                  </div>
                                  <div className="mx-2 my-4 flex w-full flex-row items-center justify-between">
                                    <div className="flex flex-col">
                                      <Link
                                        link={danceClass.classType as LinkValue}
                                        className="text-white underline"
                                      >
                                        {danceClass.classType?.text}
                                      </Link>
                                      <div className="flex gap-2">
                                        <span className="text-white">with</span>
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
  );
}
