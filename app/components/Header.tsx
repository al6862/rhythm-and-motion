"use client";

import { isInternalLink, LinkValue } from "sanity-plugin-link-field";
import LogoPrimary from "./LogoPrimary";
import NextLink from "next/link";
import { Link } from "./Link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  data: {
    navList: any[] | null;
    mobileNavList: any[] | null;
  } | null;
};

export function Header({ data }: Props) {
  const navList = data?.navList;
  const mobileNavList = data?.mobileNavList;
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
      } else {
        gsap.to(".menu-drawer", { autoAlpha: 0 });
        gsap.to(".menu-text", { autoAlpha: 1 });
      }
    },
    { dependencies: [menuIsOpen], scope: container },
  );

  return (
    <nav className="fixed top-0 z-10 flex w-full justify-between text-white">
      <NextLink href={`/`}>
        <div className="ml-[1.6rem] mt-[1.6rem] w-80">
          <LogoPrimary />
        </div>
      </NextLink>
      <div className="flex gap-12 p-[1.6rem] max-md:hidden">
        {navList?.map((link) => {
          let linkColor = "text-white";

          if (link && isInternalLink(link as LinkValue)) {
            linkColor =
              link.internalLink?.slug?.current != pathname.split("/")[1] &&
              pathname != "/"
                ? "text-black"
                : "text-white";
          }

          return (
            <span key={link._key} className={`${linkColor} menu`}>
              <Link link={link as LinkValue}>{link.text}</Link>
            </span>
          );
        })}
      </div>
      <div className="md:hidden" ref={container}>
        <div
          className={`menu-text menu opacity-1 cursor-pointer p-[1.6rem]`}
          onClick={handleMenuClick}
        >
          Menu
        </div>
        <div
          className={`menu-drawer fixed left-0 top-0 flex size-full flex-col justify-between bg-black p-[1.6rem] pb-[3.4rem] opacity-0`}
        >
          <div>
            <div className="flex w-full justify-between">
              <div className="w-80 cursor-pointer" onClick={handleMenuClick}>
                <LogoPrimary />
              </div>
              <div
                className={`close-text menu ml-auto w-fit cursor-pointer`}
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
          <div className="flex max-h-[18.4rem] flex-col flex-wrap gap-[0.8rem]">
            {mobileNavList?.map((link) => (
              <span key={link._key} className={`menu text-white`}>
                <Link link={link as LinkValue} onClick={handleMenuClick}>
                  {link.text}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
