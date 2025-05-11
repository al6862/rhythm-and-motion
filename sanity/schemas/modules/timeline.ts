import { TimelineIcon, SquareIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const timeline = defineType({
  name: "timeline",
  title: "Timeline",
  type: "document",
  icon: TimelineIcon,
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
    }),
    defineField({
      name: "events",
      title: "Timeline Events",
      type: "array",
      of: [
        defineArrayMember({
          type: "timelineEvent",
        }),
      ],
    }),
    defineField({
      name: "link",
      title: "CTA Link",
      type: "link",
      icon: SquareIcon,
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
        title: title ? title : "Classes Slideshow",
      };
    },
  },
});
