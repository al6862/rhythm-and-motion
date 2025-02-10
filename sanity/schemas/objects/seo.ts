import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    /* Meta */
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),

    /* Open graph */
    defineField({
      name: "openGraphTitle",
      title: "OpenGraph Title",
      type: "string",
    }),

    defineField({
      name: "openGraphDescription",
      title: "OpenGraph Description",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "openGraphImage",
      title: "OpenGraph Image",
      type: "image",
      description: "Recommended size is 1200x630. No larger than 1mb.",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
    }),

    /* Search */
    defineField({
      name: "includeInSitemap",
      type: "boolean",
      title: "Include page in sitemap",
      description: "For search engines. Will be added to /sitemap.xml",
      initialValue: true,
    }),
    defineField({
      name: "disallowRobots",
      type: "boolean",
      title: "Disallow in robots.txt",
      description: "Hide this route for search engines",
    }),
    defineField({
      name: "initSeo",
      type: "boolean",
      title: "Inits the SEO object",
      hidden: true,
    }),
  ],
});
