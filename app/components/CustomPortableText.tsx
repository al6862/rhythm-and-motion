import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

import { Link } from "./Link";

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return <h1 className={"h1"}>{children}</h1>;
      },
      h2: ({ children }) => {
        return <h2 className={"h2"}>{children}</h2>;
      },
      h3: ({ children }) => {
        return <h3 className={"h3"}>{children}</h3>;
      },
      h4: ({ children }) => {
        return <h4 className={"h4"}>{children}</h4>;
      },
      normal: ({ children }) => {
        return <p className={"body"}>{children}</p>;
      },
      caption: ({ children }) => {
        return <p className={"caption"}>{children}</p>;
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-[1lh] list-inside list-disc pl-[0.8em]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-[1lh] list-inside list-decimal pl-[0.8em]">
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="border-b border-dashed"
            href={value?.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
      "dashed-border": ({ children }) => {
        return (
          <div className="mt-24 border-t border-dashed pt-24">{children}</div>
        );
      },
    },
    types: {
      link: ({ value }) => {
        return (
          <div className="mt-[5.5rem]">
            <Link link={value}>
              <button className="button">{value.text}</button>
            </Link>
          </div>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
