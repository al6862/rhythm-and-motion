import { definePlugin } from "sanity";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet

const singletonTypes = ["header", "footer", "homepage", "siteSettings"];

const documentsHiddenFromContentList = [
  "page",
  "centeredText",
  "classesSlideshow",
  "community",
  "communityEvent",
  "danceClass",
  "danceStudio",
  "igGallery",
  "imageText",
  "hero",
  "photoGallery",
  "partners",
  "splitImageAndText",
  "teachers",
  "teacher",
  "timeline",
  "timelineEvent",
  "video",
];

export const singletonPlugin = definePlugin(() => {
  return {
    name: "singletonPlugin",
    document: {
      // Hide 'Singletons (such as Settings)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext, ...rest }) => {
        if (creationContext.type === "global") {
          return prev.filter(
            (templateItem) => !singletonTypes.includes(templateItem.templateId),
          );
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (singletonTypes.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  };
});

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("homepage")
        .schemaType("homepage")
        .title("Homepage")
        .child(
          S.document()
            .id("homepage")
            .schemaType("homepage")
            .documentId("homepage"),
        ),

      S.listItem()
        .title("Pages")
        .child(
          S.documentTypeList("page").defaultOrdering([
            { field: "_createdAt", direction: "asc" },
          ]),
        ),

      S.divider(),
      // Removes singletons from main list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![...documentsHiddenFromContentList, ...singletonTypes].includes(
            listItem.getId() || "",
          ),
      ),

      S.listItem()
        .title("Community Events")
        .child(
          S.documentTypeList("communityEvent").defaultOrdering([
            { field: "_createdAt", direction: "asc" },
          ]),
        ),
      S.listItem()
        .title("Partners")
        .child(
          S.documentTypeList("danceStudio").defaultOrdering([
            { field: "_createdAt", direction: "asc" },
          ]),
        ),
      S.listItem()
        .title("Teachers")
        .child(
          S.documentTypeList("teacher").defaultOrdering([
            { field: "_createdAt", direction: "asc" },
          ]),
        ),

      S.divider(),

      S.listItem()
        .title("Modules")
        .child(
          S.list()
            .title("Modules List")
            .items([
              S.listItem()
                .title("Centered Text")
                .child(
                  S.documentTypeList("centeredText").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Classes Slideshow")
                .child(
                  S.documentTypeList("classesSlideshow").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Community Events Module")
                .child(
                  S.documentTypeList("community").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Instagram Gallery")
                .child(
                  S.documentTypeList("igGallery").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Image Text Block")
                .child(
                  S.documentTypeList("imageText").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Hero")
                .child(
                  S.documentTypeList("hero").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Partners Module")
                .child(
                  S.documentTypeList("partners").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Photo Gallery")
                .child(
                  S.documentTypeList("photoGallery").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Split Image And Text")
                .child(
                  S.documentTypeList("splitImageAndText").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Teachers Module")
                .child(
                  S.documentTypeList("teachers").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Timeline")
                .child(
                  S.documentTypeList("timeline").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
              S.listItem()
                .title("Video")
                .child(
                  S.documentTypeList("video").defaultOrdering([
                    { field: "_createdAt", direction: "asc" },
                  ]),
                ),
            ]),
        ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.list()
            .title("Settings Documents")
            .items([
              S.listItem()
                .id("siteSettings")
                .schemaType("siteSettings")
                .title("SEO")
                .child(
                  S.editor()
                    .id("siteSettings")
                    .schemaType("siteSettings")
                    .documentId("siteSettings"),
                ),

              S.listItem()
                .id("header")
                .schemaType("header")
                .title("Header")
                .child(
                  S.editor()
                    .id("header")
                    .schemaType("header")
                    .documentId("header"),
                ),

              S.listItem()
                .id("footer")
                .schemaType("footer")
                .title("Footer")
                .child(
                  S.editor()
                    .id("footer")
                    .schemaType("footer")
                    .documentId("footer"),
                ),
            ]),
        ),
    ]);
