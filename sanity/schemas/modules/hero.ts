import {StarIcon} from '@sanity/icons';
import { defineField, defineType, defineArrayMember } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  icon: StarIcon,
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
      validation: (Rule) => Rule.required(),
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
      ],
    }),
    defineField({
      name: "featuredImages",
      title: "Featured Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "imageAlt",
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(2),
    }),

    defineField({
      name: "secondaryImages",
      title: "Secondary Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "imageAlt",
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Hero",
      };
    },
  },
});
