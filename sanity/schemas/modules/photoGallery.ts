import { ImageIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const photoGallery = defineType({
  name: "photoGallery",
  title: "Photo Gallery",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bgColor",
      title: "Background Color",
      type: "color",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          name: "photo",
          title: "photo",
          type: "imageAlt",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Photo Gallery",
      };
    },
  },
});
