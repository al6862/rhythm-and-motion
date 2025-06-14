import { defineField, defineType } from "sanity";

export const partners = defineType({
  name: "partners",
  title: "Partners Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'This module displays all partners listed under the "Partners" tab.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bgColor",
      title: "Background Color",
      description: "Default to background color if image is not specified",
      type: "color",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Studio Image",
      type: "imageAlt",
    }),
    defineField({
      name: "link",
      title: "Become Partner Link",
      type: "link",
      options: {
        enableText: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Partners",
      };
    },
  },
});
