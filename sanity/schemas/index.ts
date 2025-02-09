import { type SchemaTypeDefinition } from 'sanity'

/* Document Imports */
import { page } from './documents/page'
import { siteSettings } from './documents/siteSettings'

/* Module Imports */

/* Object imports */
import { seo } from './objects/seo'

const documents = [
  page,
  siteSettings,
];

const modules = [
];

const objects = [
  seo,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...documents,
    ...objects,
    ...modules,
  ],
}
