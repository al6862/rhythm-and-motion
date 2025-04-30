import { HomeIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon,
  groups: [
    { name: "main", title: "Main" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
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
            { type: "imageText" },
            { type: "partners" },
            { type: "photoGallery" },
            { type: "splitImageAndText" },
            { type: "teachers" },
            { type: "video" },
          ],
        },
      ],
    }),

    defineField({
      name: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    prepare: () => {
      return { title: "Homepage" };
    },
  },
});
