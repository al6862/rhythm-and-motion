import { DocumentVideoIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      description: "Ensure video is an mp4 file for functionality across browsers",
      type: "file",
    }),
    defineField({
      name: "hasBorder",
      title: "Add border?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "borderColor",
      title: "Border Color",
      type: "color",
      description: "Only applied if border is added.",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare: ({ title }) => {
      return {
        title: title ? title : "Video",
      };
    },
  },
});
