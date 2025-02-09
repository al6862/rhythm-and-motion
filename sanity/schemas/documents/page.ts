import { DocumentIcon as icon } from '@sanity/icons';
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon,
  groups: [
    { name: 'main', title: 'Main' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      group: 'main',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      group: 'main',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 150,
      },
      validation: Rule => Rule.required(),
    }),

    // defineField({
    //   name: 'content',
    //   title: 'Content',
    //   group: 'main',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [
    //         { type: 'backgroundImageText' },
    //         { type: 'categoryCards' },
    //         { type: 'centeredText' },
    //         { type: 'contentCarousel' },
    //         { type: 'faq' },
    //         { type: 'featuredArticle' },
    //         { type: 'fullBleedHero' },
    //         { type: 'fullWidthInsetHero' },
    //         { type: 'fullWidthTextHero' },
    //         { type: 'insetHero' },
    //         { type: 'productCarousel' },
    //         { type: 'socialFeed' },
    //         { type: 'splitImageText'},
    //         { type: 'squiggle' },
    //         { type: 'storeLocations' },
    //         { type: 'contactForm' },
    //       ],
    //     },
    //   ],
    // }),

    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },

    prepare({ title }) {
      return { title };
    }
  }
});
