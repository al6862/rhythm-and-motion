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
      name: "desktopNavList",
      title: "Desktop Nav List",
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
