import { default as NextLink } from "next/link";
import {
  Link as SanityLink,
  type LinkProps,
} from "sanity-plugin-link-field/component";
import { resolveHref } from "@/sanity/lib/utils";

export function Link(props: LinkProps) {
  return (
    <SanityLink
      as={NextLink}
      hrefResolver={({ internalLink }) =>
        resolveHref(internalLink?._type, internalLink?.slug?.current) || ""
      }
      {...props}
    />
  );
}
