"use client";

import { isInternalLink, LinkValue } from "sanity-plugin-link-field";
import LogoPrimary from "./LogoPrimary";
import NextLink from "next/link";
import { Link } from "./Link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeaderQueryResult } from "@/sanity.types";

type HeaderProps = HeaderQueryResult["header"];
type LinkProps = NonNullable<NonNullable<HeaderProps>["navList"]>[0];

export function Header({ data, color }: { data: HeaderProps; color: string }) {
  const navList = data?.navList;
  const mobileNavLists = data?.mobileNavLists;
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);

  const handleMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      if (menuIsOpen) {
        gsap.to(".menu-drawer", { autoAlpha: 1 });
        gsap.to(".menu-text", { autoAlpha: 0 });
        document.body.classList.add("overflow-hidden");
      } else {
        gsap.to(".menu-drawer", { autoAlpha: 0 });
        gsap.to(".menu-text", { autoAlpha: 1 });
        document.body.classList.remove("overflow-hidden");
      }
    },
    { dependencies: [menuIsOpen] },
  );

  useGSAP(
    () => {
      if (!document.querySelector(".hero")) {
        gsap.to(".headerDesktop", { autoAlpha: 1 });
        gsap.to(".headerMobile", { autoAlpha: 1 });
      }
    },
    { dependencies: [pathname] },
  );

  return (
    <nav className="header">
      <div className="headerDesktop invisible fixed top-0 z-30 flex w-full justify-between text-white max-md:hidden">
        <NextLink href={`/`}>
          <div className="ml-[1.6rem] mt-[1.6rem] w-80">
            <LogoPrimary />
          </div>
        </NextLink>
        <div className="flex gap-12 p-[1.6rem]">
          {navList?.map((link) => {
            let linkColor;
            if (color == "light") {
              linkColor = "text-white";

              if (link && isInternalLink(link as LinkValue)) {
                linkColor =
                  link.internalLink?.slug?.current != pathname.split("/")[1]
                    ? "text-white"
                    : "text-black";
              }
            } else {
              linkColor = "text-black hover:text-white";

              if (link && isInternalLink(link as LinkValue)) {
                linkColor =
                  link.internalLink?.slug?.current != pathname.split("/")[1]
                    ? "text-black hover:text-white"
                    : "text-white";
              }
            }

            return (
              <span key={link._key} className={`${linkColor} menu transition-colors`}>
                <Link link={link as LinkValue}>{link.text}</Link>
              </span>
            );
          })}
        </div>
      </div>
      <div
        className={`headerMobile invisible fixed top-0 z-30 flex w-full justify-between ${color == "light" ? `text-white` : color == "dark" ? `text-black` : `text-white`} md:hidden`}
      >
        <NextLink href={`/`}>
          <div className="ml-[1.6rem] mt-[1.6rem] w-80">
            <LogoPrimary />
          </div>
        </NextLink>
        <div className="md:hidden" ref={container}>
          <div
            className={`menu-text menu opacity-1 cursor-pointer p-[1.6rem]`}
            onClick={handleMenuClick}
          >
            Menu
          </div>
        </div>
      </div>
      <div
        className={`menu-drawer fixed left-0 top-0 z-40 flex h-screen w-full flex-col justify-between bg-black p-[1.6rem] pb-[3.4rem] opacity-0`}
      >
        <div>
          <div className="flex w-full justify-between">
            <div className="w-80 cursor-pointer" onClick={handleMenuClick}>
              <LogoPrimary />
            </div>
            <div
              className={`close-text menu ml-auto w-fit cursor-pointer text-white`}
              onClick={handleMenuClick}
            >
              Close
            </div>
          </div>
          <div className="mt-[16.8rem] flex flex-col gap-[1.6rem]">
            {navList?.map((link) => (
              <span key={link._key} className={`hl ml-auto text-white`}>
                <Link link={link as LinkValue} onClick={handleMenuClick}>
                  {link.text}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-[1.6rem]">
          {mobileNavLists?.map((linkList, i) => {
            return (
              <div
                key={i}
                className="menu flex flex-1 flex-col gap-[0.8rem] text-white"
              >
                {linkList?.links &&
                  linkList?.links.map((link: LinkProps) => {
                    if ("text" in link) {
                      return (
                        <Link key={link._key} link={link as LinkValue}>
                          {link.text}
                        </Link>
                      );
                    }
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
