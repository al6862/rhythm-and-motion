import { ImageIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageAlt = defineType({
  name: "imageAlt",
  title: "Image",
  type: "image",
  icon,
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Used in Alt tag, which is important for SEO and accesibility.",
    }),
  ],

  preview: {
    select: {
      title: "caption",
      media: "imageAlt",
    },
  },
});
