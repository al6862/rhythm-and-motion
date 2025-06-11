"use client";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";
import type { TeachersQueryResult } from "@/sanity.types";
import { PortableTextBlock } from "@portabletext/types";
import { useState, useEffect } from "react";
import { Link } from "./Link";
import { LinkValue } from "sanity-plugin-link-field";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type React from "react";
type TeachersProps = {
  content: TeachersQueryResult["teachers"];
};

type Teacher = NonNullable<
  NonNullable<TeachersQueryResult["teachers"]>["teachers"]
>[0];

export default function Teachers({ content }: TeachersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  const { header, image, teachers, bgColor } = content || {};

  useEffect(() => {
    const teacherSlug = searchParams.get("teacher");
    if (teacherSlug && teachers) {
      const teacher = teachers.find((s) => s.slug?.current === teacherSlug);
      if (teacher) {
        setActiveTeacher(teacher as unknown as Teacher);
      }
    } else {
      setActiveTeacher(null);
    }
  }, [searchParams, teachers]);

  const handleTeacherClick = (teacher: Teacher) => {
    if (teacher.slug?.current) {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.set("teacher", teacher.slug.current);
      router.push(`${pathname}?${urlSearchParams.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col md:relative md:flex-row">
      <div className="hidden w-full md:sticky md:top-0 md:block md:h-screen">
        <div className="md:relative md:size-full">
          {image?.assetPath ? (
            <div
              className="cursor-pointer md:relative md:size-full"
              onClick={() => router.push(`${pathname}`)}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 after:absolute after:inset-0 after:bg-black after:bg-opacity-[20%] md:absolute md:block ${activeTeacher ? "opacity-0" : "opacity-100"}`}
              >
                <Image
                  src={image.assetPath}
                  alt={image.caption || "missing alt"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="inset-0 hidden items-center justify-center text-white md:absolute md:flex">
                <div className="text-center">
                  {!activeTeacher && <h1>{header}</h1>}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="absolute inset-0 size-full cursor-pointer"
              style={{ backgroundColor: bgColor || "#ADAFA8" }}
              onClick={() => router.push(`${pathname}`)}
            >
              <div className="inset-0 hidden items-center justify-center text-white md:absolute md:flex">
                <div className="text-center">
                  {!activeTeacher && <h1>{header}</h1>}
                </div>
              </div>
            </div>
          )}

          {teachers?.map(
            (teacher) =>
              teacher.image?.assetPath && (
                <div
                  key={teacher._key}
                  className={`relative inset-0 hidden transition-all duration-500 md:absolute md:block ${
                    activeTeacher?._key === teacher._key
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }`}
                >
                  <div className="inset-0 hidden items-center justify-center transition-all duration-500 md:absolute md:flex">
                    <div className="relative flex-col items-center">
                      {teacher.image?.assetPath && (
                        <div
                          onClick={() => router.push(`${pathname}`)}
                          className="z-10 hidden overflow-hidden md:absolute md:right-[-50px] md:top-[-300px] md:block md:size-[25rem] md:h-[175px] lg:right-[-100px] lg:h-[275px] xl:right-[-350px] xl:w-[37.5rem]"
                        >
                          <Image
                            src={teacher.image.assetPath}
                            alt={teacher.image.caption || "missing alt"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p
                        className={`absolute top-[-50px] transition-opacity duration-500 lg:left-[-100px] xl:left-[-200px] 2xl:left-[-300px] ${activeTeacher?._key === teacher._key ? "opacity-100" : "opacity-0"}`}
                        onClick={() => router.push(`${pathname}`)}
                      >
                        {teacher.pronouns}
                      </p>
                      <h1
                        className="max-w-[300px] text-center"
                        onClick={() => router.push(`${pathname}`)}
                      >
                        {teacher.name}
                      </h1>
                      <div
                        className={`bottom-[-50px] text-right transition-opacity duration-500 md:absolute lg:right-[-100px] xl:right-[-200px] 2xl:right-[-400px] ${activeTeacher?._key === teacher._key ? "opacity-100" : "opacity-0"}`}
                      >
                        <p>Teacher at</p>
                        <Link
                          link={teacher.studio as LinkValue}
                          className="underline"
                        >
                          {teacher.studio?.text}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      <div
        className={`z-5 no-scrollbar md:r-0 relative overflow-y-scroll transition-all after:bg-white md:w-1/3 md:min-w-[493px] md:py-[100px] md:pb-[16px] md:pl-[16px] md:pr-[30px]`}
        style={{
          backgroundColor: activeTeacher ? bgColor || "#ADAFA8" : "white",
        }}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${!activeTeacher ? "opacity-0" : "opacity-100"}`}
        >
          {teachers?.map((teacher) => (
            <div
              key={teacher._key}
              className={` ${activeTeacher?._key === teacher._key ? "block" : "hidden"}`}
            >
              <div className="md:hidden">
                <div
                  className={`transition-all duration-500 ${
                    activeTeacher?._key === teacher._key
                      ? "opacity-100"
                      : "hidden opacity-0"
                  }`}
                >
                  <Image
                    src={teacher.image?.assetPath || ""}
                    alt={teacher.image?.caption || "missing alt"}
                    width={1000}
                    height={1000}
                    className="mt-[100px] h-[314.4px] w-full object-cover"
                  />
                </div>

                <div className="relative my-[100px] w-full md:my-0">
                  <div className="inset-0 top-[150px] items-center justify-center transition-all duration-500">
                    <div className="relative flex-col items-center">
                      <p
                        className={`absolute left-10 top-[-60px] transition-all duration-500 ${activeTeacher?._key === teacher._key ? "opacity-100" : "opacity-0"}`}
                      >
                        {teacher.pronouns}
                      </p>
                      <h1 className="inset-0 mx-auto max-w-[200px] text-center transition-all duration-500">
                        {teacher.name}
                      </h1>

                      <Link
                        className={`absolute bottom-[-60px] right-10 text-right underline transition-all duration-500 ${activeTeacher?._key === teacher._key ? "opacity-100" : "opacity-0"}`}
                        link={teacher.studio as LinkValue}
                      >
                        {teacher.studio?.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] px-8 md:mt-0 md:py-0">
                {teacher.blurb && (
                  <div className="pb-16">
                    <CustomPortableText
                      value={teacher.blurb as unknown as PortableTextBlock[]}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`mt-32 flex flex-col gap-12 px-8 pb-8 transition-all duration-500 ease-in-out md:mt-[80px] md:py-0`}
        >
          <h1
            className={`pb-20 pt-32 text-center text-black md:hidden ${activeTeacher ? "hidden" : "block"}`}
          >
            {header}
          </h1>
          <div>
            <div className="flex flex-row items-start">
              <h2 className="text-left text-black">A-Z</h2>
              {teachers?.length && (
                <div className="ml-4 flex size-[31px] items-center justify-center rounded-xl bg-black font-bold text-white group-hover:text-white md:mt-[-2px]">
                  <p>{teachers.length}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            {teachers &&
              bgColor &&
              teachers.map((teacher) => {
                return (
                  <div
                    key={teacher._key}
                    style={{ "--hover-bg": bgColor } as React.CSSProperties}
                    className={`group cursor-pointer text-black transition-all ${activeTeacher?._key === teacher._key ? "pointer-events-none bg-white brightness-50" : activeTeacher ? "hover:bg-white" : `hover:bg-[var(--hover-bg)]`}`}
                    onClick={() => handleTeacherClick(teacher)}
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
                          fill="black"
                          mask="url(#path-1-inside-1_258_855)"
                        />
                      </svg>
                    </div>
                    <div className="m-4 flex w-full flex-row items-center justify-between">
                      <div>
                        <p className="font-bold">{teacher.name}</p>
                        <p>{teacher.pronouns}</p>
                        <Link
                          link={teacher.studio as LinkValue}
                          className="underline"
                        >
                          {teacher.studio?.text}
                        </Link>
                      </div>
                      {teacher.image?.assetPath && (
                        <div className="relative mr-6 size-[90px] overflow-hidden rounded-full">
                          <Image
                            src={teacher.image.assetPath}
                            alt={teacher.image.caption || "missing alt"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
