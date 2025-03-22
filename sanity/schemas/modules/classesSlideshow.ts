import { BoltIcon, SquareIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const classesSlideshow = defineType({
  name: "classesSlideshow",
  title: "Classes Slideshow",
  type: "document",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "classes",
      title: "Classes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "className",
              title: "Class Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "bgColor",
              title: "Background Color",
              type: "color",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Background Image",
              description:
                "If no background image uploaded, background color is used instead.",
              type: "imageAlt",
            }),
            defineField({
              name: "video",
              title: "Background Video",
              description:
                "If no background video uploaded, background image is used instead. Ensure video is an mp4 file for functionality across browsers",
              type: "file",
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
              title: "className",
            },
          },
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
