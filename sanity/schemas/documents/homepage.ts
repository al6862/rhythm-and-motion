import { HomeIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
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
        "This determines the color of the header when on the homepage. The active link will be the contrasting color. The default styling is dark on desktop, light on mobile.",
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
  ],

  preview: {
    prepare: () => {
      return { title: "Homepage" };
    },
  },
});
