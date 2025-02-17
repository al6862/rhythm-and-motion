import { BlockContentIcon, LinkIcon, SquareIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const centeredText = defineType({
  name: "centeredText",
  title: "Centered Text",
  type: "document",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading XXL", value: "h1" },
            { title: "Heading XL", value: "h2" },
            { title: "Heading L", value: "h3" },
            { title: "Medium", value: "h4" },
          ],
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
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Centered Text",
      };
    },
  },
});
