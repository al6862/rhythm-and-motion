import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { header, homepage, footer, page, siteSettings } from "./documents";

/* Module Imports */
import {
  centeredText,
  classesSlideshow,
  imageText,
  hero,
  photoGallery,
  partners,
  splitImageAndText,
  video,
} from "./modules";

/* Object imports */
import { danceClass, danceStudio, imageAlt, linkList, seo } from "./objects";

const documents = [header, homepage, footer, page, siteSettings];

const modules = [
  centeredText,
  classesSlideshow,
  imageText,
  hero,
  photoGallery,
  partners,
  splitImageAndText,
  video,
];

const objects = [danceClass, danceStudio, imageAlt, linkList, seo];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
