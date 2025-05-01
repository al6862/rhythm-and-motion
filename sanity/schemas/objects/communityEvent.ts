import { defineField, defineType } from "sanity";
import { defineArrayMember } from "sanity";

export const communityEvent = defineType({
  name: "communityEvent",
  title: "Community Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 150,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "imageAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Event Content",
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
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
      ],
    }),
    defineField({
      name: "startDate",
      title: "Event Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Event End Date",
      type: "date",
    }),
  ],

  preview: {
    select: {
      title: "title",
      startDate: "startDate",
    },
    prepare: ({ title, startDate }) => {
      return {
        title: title,
        subtitle: startDate
          ? `${new Date(startDate).toLocaleDateString()}`
          : "No date set",
      };
    },
  },
});
