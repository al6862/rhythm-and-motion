import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { page, homepage, siteSettings } from "./documents";

/* Module Imports */
import { centeredText, photoGallery } from "./modules";

/* Object imports */
import { seo, imageAlt } from "./objects";

const documents = [page, homepage, siteSettings];

const modules = [centeredText, photoGallery];

const objects = [seo, imageAlt];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
