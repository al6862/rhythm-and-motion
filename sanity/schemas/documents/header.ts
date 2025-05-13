import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

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
          icon: LinkIcon,
          options: {
            enableText: true,
          },
        },
      ],
    }),

    defineField({
      name: "mobileNavLists",
      title: "Additional Mobile Link Lists",
      type: "array",
      of: [{ type: "linkList" }],
      validation: (Rule) => Rule.max(2),
    }),
  ],

  preview: {
    prepare: () => ({ title: "Header" }),
  },
});
