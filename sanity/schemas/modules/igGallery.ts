import { ImageIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const igGallery = defineType({
  name: "igGallery",
  title: "Instagram Gallery",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "igEmbeds",
      title: "Instagram Embeds",
      type: "array",
      of: [
        defineArrayMember({
          name: "igEmbed",
          title: "Instagram Embed",
          type: "text",
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
        title: title ? title : "Instagram Gallery",
      };
    },
  },
});
