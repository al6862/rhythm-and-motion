import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "navList",
      title: "Navigation Link List",
      type: "array",
      of: [
        {
          type: "link",
          options: {
            enableText: true,
          },
        },
      ],
    }),

    defineField({
      name: "mobileNavList",
      title: "Additional Mobile Link List",
      type: "array",
      of: [{ type: "linkList" }],
      validation: (Rule) => Rule.max(2),
    }),
  ],

  preview: {
    prepare: () => ({ title: "Header" }),
  },
});
