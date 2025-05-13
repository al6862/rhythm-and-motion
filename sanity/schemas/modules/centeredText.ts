import { BlockContentIcon, SquareIcon } from "@sanity/icons";
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
      name: "marginY",
      title: "Top and Bottom Margin",
      type: "number",
      initialValue: 250,
      validation: (Rule) => Rule.max(300).min(100),
    }),
    defineField({
      name: "bgColor",
      title: "Background Color",
      type: "color",
    }),
    defineField({
      name: "image",
      title: "Background Image",
      description:
        "If no background image uploaded, background color is used instead.",
      type: "imageAlt",
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
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              {
                title: "Dashed Top Border",
                value: "dashed-border",
                icon: () => "-",
              },
            ],
          },
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
      name: "textColor",
      title: "Text Color",
      type: "color",
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
