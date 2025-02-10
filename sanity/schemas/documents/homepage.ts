import { HomeIcon as icon } from '@sanity/icons';
import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon,
  groups: [
    { name: 'main', title: 'Main' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
  //  defineField({
  //     name: 'content',
  //     title: 'Content',
  //     group: 'main',
  //     type: 'array',
  //     of: [
  //       {
  //         type: 'reference',
  //         to: [
  //           { type: 'backgroundImageText' },
  //           { type: 'fullBleedHero' },
  //           { type: 'insetHero' },
  //           { type: 'fullWidthInsetHero' },
  //           { type: 'socialFeed' },
  //           { type: 'storeLocations' },
  //           { type: 'categoryCards' },
  //           { type: 'squiggle' },
  //           { type: 'contentCarousel' },
  //           { type: 'productCarousel' },
  //           { type: 'bigTextImage' },
  //         ],
  //       },
  //     ],
  //   }),

    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    prepare: () => {
      return { title: 'Homepage'};
    }
  }
});
