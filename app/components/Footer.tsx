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
                  <div
                    key={i}
                    className="menu flex flex-col gap-[1.6rem] lg:w-1/3"
                  >
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
          <div className="flex gap-[1.6rem] max-md:flex-col md:gap-[3.8rem]">
            <div className="md:max-h-[6.2rem] md:max-w-[32.8rem]">
              <CustomPortableText
                value={footer?.newsletterContent as PortableTextBlock[]}
              />
            </div>
            <div id="mc_embed_shell">
              <div id="mc_embed_signup">
                <form
                  action="https://rhythmandmotion.us11.list-manage.com/subscribe/post?u=192147a1880cfec1a55caa391&amp;id=ce24e458a6&amp;f_id=007115e1f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_self"
                  noValidate
                >
                  <div
                    id="mc_embed_signup_scroll"
                    className="flex w-full gap-[1.6rem] md:w-[32.8rem]"
                  >
                    <div className="mc-field-group flex-1">
                      <input
                        type="email"
                        name="EMAIL"
                        placeholder="Your email address"
                        className="required email input size-full border-b border-dashed bg-transparent"
                        id="mce-EMAIL"
                        required
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-5000px" }}
                    >
                      <input
                        type="text"
                        name="b_192147a1880cfec1a55caa391_ce24e458a6"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="button bg-white/20"
                        defaultValue="Submit"
                      />
                    </div>
                  </div>
                  <div id="mce-responses" className="clear">
                    <div
                      className="response"
                      id="mce-error-response"
                      style={{ display: "none" }}
                    ></div>
                    <div
                      className="response"
                      id="mce-success-response"
                      style={{ display: "none" }}
                    ></div>
                  </div>
                </form>
              </div>
            </div>
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
