import { type SchemaTypeDefinition } from "sanity";

/* Document Imports */
import { header, homepage, footer, page, siteSettings } from "./documents";

/* Module Imports */
import {
  centeredText,
  classesSlideshow,
  community,
  igGallery,
  imageText,
  hero,
  photoGallery,
  partners,
  splitImageAndText,
  teachers,
  timeline,
  video,
} from "./modules";

/* Object imports */
import {
  communityEvent,
  danceClass,
  danceStudio,
  imageAlt,
  linkList,
  seo,
  teacher,
  timelineEvent,
} from "./objects";

const documents = [header, homepage, footer, page, siteSettings];

const modules = [
  centeredText,
  classesSlideshow,
  community,
  igGallery,
  imageText,
  hero,
  photoGallery,
  partners,
  splitImageAndText,
  teachers,
  timeline,
  video,
];

const objects = [
  communityEvent,
  danceClass,
  danceStudio,
  imageAlt,
  linkList,
  seo,
  teacher,
  timelineEvent,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...modules],
};
