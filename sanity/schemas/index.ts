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
  video,
} from "./modules";

/* Object imports */
import { imageAlt, linkList, seo } from "./objects";

const documents = [header, homepage, footer, page, siteSettings];

const modules = [centeredText, classesSlideshow, imageText, hero, photoGallery, video];

const objects = [imageAlt, linkList, seo];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
