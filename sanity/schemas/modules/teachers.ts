import { defineField, defineType, defineArrayMember } from "sanity";

export const teachers = defineType({
  name: "teachers",
  title: "Teachers",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
    defineField({
      name: "teachers",
      title: "Teachers",
      type: "array",
      of: [
        defineArrayMember({
          type: "teacher",
          name: "teacher",
          title: "Teacher",
        }),
      ],
      validation: (R) => R.unique(),
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
