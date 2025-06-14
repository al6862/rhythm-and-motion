import { defineField, defineType } from "sanity";

export const teachers = defineType({
  name: "teachers",
  title: "Teachers Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'This module displays all teachers listed under the "Teachers" tab.',
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
      title: "Background Image",
      type: "imageAlt",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Teachers",
      };
    },
  },
});
