import { DocumentIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon,
  groups: [
    { name: "main", title: "Main" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      group: "main",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      group: "main",
      type: "slug",
      options: {
        source: "title",
        maxLength: 150,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Content",
      group: "main",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "hero" },
            { type: "centeredText" },
            { type: "classesSlideshow" },
            { type: "community" },
            { type: "igGallery" },
            { type: "imageText" },
            { type: "partners" },
            { type: "photoGallery" },
            { type: "splitImageAndText" },
            { type: "teachers" },
            { type: "timeline" },
            { type: "video" },
          ],
        },
      ],
    }),
    defineField({
      name: "headerColor",
      title: "Header Color",
      description:
        "This determines the color of the header when on this page. The active link will be the contrasting color. The default styling is dark on desktop, light on mobile.",
      type: "string",
      initialValue: "lightOnMobile",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
          {
            title: "Dark on desktop, light on mobile.",
            value: "lightOnMobile",
          },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare({ title }) {
      return { title };
    },
  },
});
