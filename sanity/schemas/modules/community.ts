import { defineField, defineType } from "sanity";

export const community = defineType({
  name: "community",
  title: "Community Events Module",
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
      name: "image",
      title: "Background Image",
      type: "imageAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "link",
      options: {
        enableText: true,
      },
    }),
  ],
});
