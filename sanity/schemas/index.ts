import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { header, homepage, footer, page, siteSettings } from "./documents";

/* Module Imports */
import { centeredText, photoGallery, classesSlideshow } from "./modules";

/* Object imports */
import { imageAlt, linkList, seo } from "./objects";

const documents = [header, homepage, footer, page, siteSettings];

const modules = [centeredText, photoGallery, classesSlideshow];

const objects = [imageAlt, linkList, seo];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
