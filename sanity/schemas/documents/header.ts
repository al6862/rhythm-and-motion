import { defineArrayMember, defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "promo",
      title: "Optional Promo Bar",
      type: "string",
      description: "Leave blank to hide on front end",
      initialValue: "Lorem ipsum dolor sit amet",
    }),

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
      of: [
        {
          type: "link",
          options: {
            enableText: true,
          },
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Header" }),
  },
});
