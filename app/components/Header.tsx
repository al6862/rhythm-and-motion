'use client'

import { type LinkProps } from "sanity-plugin-link-field/component";
import LogoPrimary from "./LogoPrimary"
import NextLink from "next/link"
import { Link } from "./Link"
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { Router } from "next/router";

type Props = {
    navList: LinkProps[];
    mobileNavList: LinkProps[];
    promo: string;
};

export function Header({ data } : Protrues) {
  const { navList, mobileNavList, promo } = data
  const pathname = usePathname()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const container = useRef()

  const handleMenuClick = (event) => {
    setMenuIsOpen(!menuIsOpen)
  }

  useEffect(() => {
    setMenuIsOpen(false)
  }, [pathname])

  return (
    <nav ref={container} className="fixed top-0 text-white z-10 flex justify-between w-full">
        <NextLink href={`/`}>
          <div className="w-[20rem] mt-[1.6rem] ml-[1.6rem]">
              <LogoPrimary />
          </div>
        </NextLink>
        <div className="max-md:hidden p-[1.6rem] flex gap-[3rem]">
          {navList?.map((item, i) => {
            const itemColor = item.internalLink?.slug.current != pathname.split("/")[1] && pathname != "/"? 'text-black' : 'text-white';

            return (
              <span key={item._key} className={`${itemColor} menu`} >
                <Link link={item}>{item.text}</Link>
              </span>
            )
          })}
        </div>
        <div className="md:hidden overlayContainer opacity-1">
          <div className={`p-[1.6rem] menu cursor-pointer ${menuIsOpen && 'hidden'}`} onClick={handleMenuClick}>Menu</div>
          <div className={`fixed top-0 left-0 w-full h-full p-[1.6rem] pb-[3.4rem] bg-black ${!menuIsOpen && 'hidden'} flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between w-full">
                <div className="w-[20rem] cursor-pointer" onClick={handleMenuClick}>
                  <LogoPrimary />
                </div>
                <div className={`ml-auto w-fit menu cursor-pointer ${!menuIsOpen && 'hidden'}`} onClick={handleMenuClick}>Close</div>
              </div>
              <div className="mt-[16.8rem] flex flex-col gap-[1.6rem]">
                {navList?.map((item, i) => (
                    <span key={item._key} className={`text-white ml-auto hl`} >
                      <Link link={item} onClick={handleMenuClick}>{item.text}</Link>
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-[0.8rem] max-h-[18.4rem]">
              {mobileNavList?.map((item, i) => (
                  <span key={item._key} className={`text-white menu`} >
                    <Link link={item} onClick={handleMenuClick}>{item.text}</Link>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
    </nav>
  );
}
