import { defineField, defineType } from "sanity";
import { defineArrayMember } from "sanity";
import { SquareIcon } from "@sanity/icons";

export const timelineEvent = defineType({
  name: "timelineEvent",
  title: "Timeline Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
        defineField({
          name: "link",
          title: "CTA Button",
          type: "link",
          icon: SquareIcon,
          options: {
            enableText: true,
          },
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
        defineField({
          name: "link",
          title: "CTA Button",
          type: "link",
          icon: SquareIcon,
          options: {
            enableText: true,
          },
        }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "imageAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Image",
      type: "imageAlt",
      description: "The caption of the secondary image is displayed.",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
