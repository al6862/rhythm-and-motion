import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { page } from "./documents/page";
import { homepage } from "./documents/homepage";
import { siteSettings } from "./documents/siteSettings";

/* Module Imports */
import { centeredText } from "./modules/centeredText";

/* Object imports */
import { seo } from "./objects/seo";
import { imageAlt } from "./objects/imageAlt";

const documents = [page, homepage, siteSettings];

const modules = [centeredText];

const objects = [seo, imageAlt];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
