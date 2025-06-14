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
                  key={teacher._id}
                  className={`relative inset-0 hidden transition-all duration-500 md:absolute md:block ${
                    activeTeacher?._id === teacher._id
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
                        className={`absolute top-[-50px] transition-opacity duration-500 lg:left-[-100px] xl:left-[-200px] 2xl:left-[-300px] ${activeTeacher?._id === teacher._id ? "opacity-100" : "opacity-0"}`}
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
                        className={`bottom-[-50px] text-right transition-opacity duration-500 md:absolute lg:right-[-100px] xl:right-[-200px] 2xl:right-[-400px] ${activeTeacher?._id === teacher._id ? "opacity-100" : "opacity-0"}`}
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
        className={`z-5 no-scrollbar md:r-0 relative overflow-y-scroll transition-all after:bg-white md:w-1/3 md:min-w-[493px] md:pb-[1.6rem] md:pl-[16px] md:pr-[30px] md:pt-[13.4rem]`}
        style={{
          backgroundColor: activeTeacher ? bgColor || "#ADAFA8" : "white",
        }}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${!activeTeacher ? "opacity-0" : "opacity-100"}`}
        >
          {teachers?.map((teacher) => (
            <div
              key={teacher._id}
              className={` ${activeTeacher?._id === teacher._id ? "block" : "hidden"}`}
            >
              <div className="md:hidden">
                <div
                  className={`transition-all duration-500 ${
                    activeTeacher?._id === teacher._id
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
                        className={`absolute left-10 top-[-60px] transition-all duration-500 ${activeTeacher?._id === teacher._id ? "opacity-100" : "opacity-0"}`}
                      >
                        {teacher.pronouns}
                      </p>
                      <h1 className="inset-0 mx-auto max-w-[200px] text-center transition-all duration-500">
                        {teacher.name}
                      </h1>

                      <Link
                        className={`absolute bottom-[-60px] right-10 text-right underline transition-all duration-500 ${activeTeacher?._id === teacher._id ? "opacity-100" : "opacity-0"}`}
                        link={teacher.studio as LinkValue}
                      >
                        {teacher.studio?.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] px-8 md:mt-0 md:py-0">
                <button
                  onClick={() => router.push("/our-teachers")}
                  className="mb-8 flex w-fit items-center gap-2 underline"
                >
                  ← Back
                </button>
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
          className={`flex flex-col gap-12 transition-all duration-500 ease-in-out max-md:px-[1.6rem] max-md:pb-[1.6rem]`}
        >
          <h1
            className={`pb-20 pt-[17rem] text-center text-black md:hidden ${activeTeacher ? "hidden" : "block"}`}
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
                    key={teacher._id}
                    style={{ "--hover-bg": bgColor } as React.CSSProperties}
                    className={`group cursor-pointer text-black transition-all ${activeTeacher?._id === teacher._id ? "pointer-events-none bg-white brightness-50" : activeTeacher ? "hover:bg-white" : `hover:bg-[var(--hover-bg)]`}`}
                    onClick={() => handleTeacherClick(teacher)}
                  >
                    <div className="flex w-full flex-row items-center justify-between border-t border-dashed py-4">
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
