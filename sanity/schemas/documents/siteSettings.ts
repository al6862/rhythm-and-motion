import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
