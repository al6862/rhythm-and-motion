import { defineField, defineType, defineArrayMember } from "sanity";
import { SquareIcon } from "@sanity/icons";

export const danceStudio = defineType({
  name: "danceStudio",
  title: "Dance Studio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "header",
      title: "Studio Header",
      type: "document",
      fields: [
        defineField({
          name: "studioTitle",
          title: "Studio Title",
          type: "string",
        }),
        defineField({
          name: "studioSubTitle",
          title: "Studio Sub-Title",
          type: "string",
        }),
      ],
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
      name: "studioAddress",
      title: "Full Address of Studio",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "State of Studio",
      description:
        "This is used for categorizing the studios by location in the partners page",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studioDescription",
      title: "Class Description",
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
      name: "bgColor",
      title: "Background Color",
      description: "Default to background color if image is not specified",
      type: "color",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Studio Image",
      type: "imageAlt",
    }),
    defineField({
      name: "danceClasses",
      title: "Dance Classes",
      type: "array",
      of: [
        defineArrayMember({
          name: "class",
          title: "Dance Class",
          type: "danceClass",
        }),
      ],
    }),
    defineField({
      name: "partnerSite",
      title: "Partner Site Link",
      type: "link",
      options: {
        enableText: true,
      },
    }),
    defineField({
      name: "partnerLink",
      title: "Become Partner Link",
      type: "link",
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
        title: title ? title : "Dance Studio",
      };
    },
  },
});
