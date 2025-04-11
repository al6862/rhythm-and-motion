import { ListIcon, LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const linkList = defineType({
  name: "linkList",
  title: "Link List",
  type: "object",
  icon: ListIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "links",
      title: "Links",
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
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => ({ title }),
  },
});
