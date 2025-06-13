import { defineField, defineType, defineArrayMember } from "sanity";
import { SquareIcon } from "@sanity/icons";
export const teacher = defineType({
  name: "teacher",
  title: "Teacher",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Teacher Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 150,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pronouns",
      title: "Pronouns",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
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
    defineField({
      name: "studio",
      title: "Studio",
      type: "link",
      options: {
        enableText: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      name: "name",
    },

    prepare: ({ name }) => {
      return {
        title: name,
      };
    },
  },
});
