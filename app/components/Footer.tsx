import { CustomPortableText } from "./CustomPortableText";
import { type PortableTextBlock } from "next-sanity";
import type { FooterQueryResult } from "@/sanity.types";
import LogoStamp from "./LogoStamp";
import type { LinkValue } from "sanity-plugin-link-field";
import { Link } from "./Link";

export function Footer({ data }: { data: FooterQueryResult }) {
  const { footer } = data;
  const currYear = new Date().getFullYear();

  return (
    <div className="bg-black p-[3.4rem] text-white">
      <div className="border-y border-white/10 py-24">
        <div className="flex max-lg:flex-col max-lg:gap-24">
          <div className="w-1/2">
            <div className="size-40">
              <LogoStamp />
            </div>
          </div>
          <div className="flex w-1/2 gap-24 max-lg:flex-col lg:gap-[1.6rem]">
            {footer?.linkLists &&
              footer?.linkLists.map((linkList, i) => {
                return (
                  <div key={i} className="flex w-1/3 flex-col gap-[1.6rem]">
                    {linkList?.links &&
                      linkList?.links.map((link) => {
                        return (
                          <Link key={link._key} link={link as LinkValue}>
                            {link.text}
                          </Link>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="pt-24">
        {footer?.newsletterContent && (
          <div className="md:max-h-[6.2rem] md:max-w-[32.8rem]">
            <CustomPortableText
              value={footer?.newsletterContent as PortableTextBlock[]}
            />
          </div>
        )}
        <div className="mt-24 md:flex md:items-end">
          {footer?.footerContent && (
            <div className="opacity-50 md:w-1/2">
              <CustomPortableText
                value={footer?.footerContent as PortableTextBlock[]}
              />
            </div>
          )}
          <div className="caption opacity-50 max-md:mt-[1.6rem] md:w-1/2">
            © {currYear} Rhythm & Motion
          </div>
        </div>
      </div>
    </div>
  );
}
