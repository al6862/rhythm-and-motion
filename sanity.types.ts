/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type PhotoGallery = {
  _id: string;
  _type: "photoGallery";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  bgColor?: Color;
  photos?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    _type: "photo";
    _key: string;
  }>;
};

export type CenteredText = {
  _id: string;
  _type: "centeredText";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  marginY?: number;
  bgColor?: Color;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    _type: "imageAlt";
  };
  content?: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "normal" | "h1" | "h2" | "h3" | "h4";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }
    | ({
        _key: string;
      } & Link)
  >;
  textColor?: Color;
};

export type ImageAlt = {
  _type: "imageAlt";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  caption?: string;
};

export type SiteSettings = {
  _id: string;
  _type: "siteSettings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  SEO?: Seo;
};

export type Header = {
  _id: string;
  _type: "header";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  promo?: string;
  navList?: Array<
    {
      _key: string;
    } & Link
  >;
  mobileNavList?: Array<
    {
      _key: string;
    } & Link
  >;
};

export type Color = {
  _type: "color";
  hex?: string;
  alpha?: number;
  hsl?: HslaColor;
  hsv?: HsvaColor;
  rgb?: RgbaColor;
};

export type RgbaColor = {
  _type: "rgbaColor";
  r?: number;
  g?: number;
  b?: number;
  a?: number;
};

export type HsvaColor = {
  _type: "hsvaColor";
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

export type HslaColor = {
  _type: "hslaColor";
  h?: number;
  s?: number;
  l?: number;
  a?: number;
};

export type Link = {
  _type: "link";
  text?: string;
  type?: string;
  internalLink?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "page";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "homepage";
      };
  url?: string;
  email?: string;
  phone?: string;
  value?: string;
  blank?: boolean;
  parameters?: string;
  anchor?: string;
};

export type Homepage = {
  _id: string;
  _type: "homepage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  content?: Array<
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "centeredText";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "photoGallery";
      }
  >;
  SEO?: Seo;
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  content?: Array<
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "centeredText";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "photoGallery";
      }
  >;
  SEO?: Seo;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Seo = {
  _type: "seo";
  metaTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  includeInSitemap?: boolean;
  disallowRobots?: boolean;
  initSeo?: boolean;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | PhotoGallery
  | CenteredText
  | ImageAlt
  | SiteSettings
  | Header
  | Color
  | RgbaColor
  | HsvaColor
  | HslaColor
  | Link
  | Homepage
  | Page
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Seo
  | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/queries.ts
// Variable: photoGalleryData
// Query: {    _id,    _type,    'bgColor': bgColor.hex,    photos[] {    caption,    'assetId': asset->_id,    'assetPath': asset->path,    'aspectRatio': asset->metadata.dimensions.aspectRatio,}}
export type PhotoGalleryDataResult = {
  _id: never;
  _type: never;
  bgColor: never;
  photos: never;
};
// Variable: siteSettingsQuery
// Query: *[_type == 'siteSettings'][0] {        SEO {    ...,    'openGraphImage': openGraphImage.asset->url,},    }
export type SiteSettingsQueryResult = {
  SEO: {
    _type: "seo";
    metaTitle?: string;
    metaDescription?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    openGraphImage: string | null;
    includeInSitemap?: boolean;
    disallowRobots?: boolean;
    initSeo?: boolean;
  } | null;
} | null;
// Variable: headerQuery
// Query: {    'header': *[_type == 'header'][0] {        ...,        navList[] {            ...,              _type == "link" => {    ...,    internalLink->{_type,slug,title}  },        },        mobileNavList[] {            ...,              _type == "link" => {    ...,    internalLink->{_type,slug,title}  },        }    }}
export type HeaderQueryResult = {
  header: {
    _id: string;
    _type: "header";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    promo?: string;
    navList: Array<{
      _key: string;
      _type: "link";
      text?: string;
      type?: string;
      internalLink:
        | {
            _type: "homepage";
            slug: null;
            title: null;
          }
        | {
            _type: "page";
            slug: Slug | null;
            title: string | null;
          }
        | null;
      url?: string;
      email?: string;
      phone?: string;
      value?: string;
      blank?: boolean;
      parameters?: string;
      anchor?: string;
    }> | null;
    mobileNavList: Array<{
      _key: string;
      _type: "link";
      text?: string;
      type?: string;
      internalLink:
        | {
            _type: "homepage";
            slug: null;
            title: null;
          }
        | {
            _type: "page";
            slug: Slug | null;
            title: string | null;
          }
        | null;
      url?: string;
      email?: string;
      phone?: string;
      value?: string;
      blank?: boolean;
      parameters?: string;
      anchor?: string;
    }> | null;
  } | null;
};
// Variable: homepageQuery
// Query: {    'homepage': *[_type == 'homepage'][0] {        ...,        content[]->{    ...,    _type == 'centeredText' => {    _id,    _type,    marginY,    'bgColor': bgColor.hex,    'textColor': textColor.hex,    image {    caption,    'assetId': asset->_id,    'assetPath': asset->path,    'aspectRatio': asset->metadata.dimensions.aspectRatio,},    content[] {      ...,        _type == "link" => {    ...,    internalLink->{_type,slug,title}  },    },},    _type == 'photoGallery' => {    _id,    _type,    'bgColor': bgColor.hex,    photos[] {    caption,    'assetId': asset->_id,    'assetPath': asset->path,    'aspectRatio': asset->metadata.dimensions.aspectRatio,}},},        SEO {    ...,    'openGraphImage': openGraphImage.asset->url,},    }}
export type HomepageQueryResult = {
  homepage: {
    _id: string;
    _type: "homepage";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    content: Array<
      | {
          _id: string;
          _type: "centeredText";
          _createdAt: string;
          _updatedAt: string;
          _rev: string;
          title?: string;
          marginY: number | null;
          bgColor: string | null;
          image: {
            caption: string | null;
            assetId: string | null;
            assetPath: string | null;
            aspectRatio: number | null;
          } | null;
          content: Array<
            | {
                children?: Array<{
                  marks?: Array<string>;
                  text?: string;
                  _type: "span";
                  _key: string;
                }>;
                style?: "h1" | "h2" | "h3" | "h4" | "normal";
                listItem?: "bullet" | "number";
                markDefs?: Array<{
                  href?: string;
                  _type: "link";
                  _key: string;
                }>;
                level?: number;
                _type: "block";
                _key: string;
              }
            | {
                _key: string;
                _type: "link";
                text?: string;
                type?: string;
                internalLink:
                  | {
                      _type: "homepage";
                      slug: null;
                      title: null;
                    }
                  | {
                      _type: "page";
                      slug: Slug | null;
                      title: string | null;
                    }
                  | null;
                url?: string;
                email?: string;
                phone?: string;
                value?: string;
                blank?: boolean;
                parameters?: string;
                anchor?: string;
              }
          > | null;
          textColor: string | null;
        }
      | {
          _id: string;
          _type: "photoGallery";
          _createdAt: string;
          _updatedAt: string;
          _rev: string;
          title?: string;
          bgColor: string | null;
          photos: Array<{
            caption: string | null;
            assetId: string | null;
            assetPath: string | null;
            aspectRatio: number | null;
          }> | null;
        }
    > | null;
    SEO: {
      _type: "seo";
      metaTitle?: string;
      metaDescription?: string;
      openGraphTitle?: string;
      openGraphDescription?: string;
      openGraphImage: string | null;
      includeInSitemap?: boolean;
      disallowRobots?: boolean;
      initSeo?: boolean;
    } | null;
  } | null;
};
// Variable: pageQuery
// Query: {    'page': *[_type == 'page' && $slug == slug.current][0] {        ...,        title,        content[]->{    ...,    _type == 'centeredText' => {    _id,    _type,    marginY,    'bgColor': bgColor.hex,    'textColor': textColor.hex,    image {    caption,    'assetId': asset->_id,    'assetPath': asset->path,    'aspectRatio': asset->metadata.dimensions.aspectRatio,},    content[] {      ...,        _type == "link" => {    ...,    internalLink->{_type,slug,title}  },    },},    _type == 'photoGallery' => {    _id,    _type,    'bgColor': bgColor.hex,    photos[] {    caption,    'assetId': asset->_id,    'assetPath': asset->path,    'aspectRatio': asset->metadata.dimensions.aspectRatio,}},},        SEO {    ...,    'openGraphImage': openGraphImage.asset->url,},    }}
export type PageQueryResult = {
  page: {
    _id: string;
    _type: "page";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title: string | null;
    slug?: Slug;
    content: Array<
      | {
          _id: string;
          _type: "centeredText";
          _createdAt: string;
          _updatedAt: string;
          _rev: string;
          title?: string;
          marginY: number | null;
          bgColor: string | null;
          image: {
            caption: string | null;
            assetId: string | null;
            assetPath: string | null;
            aspectRatio: number | null;
          } | null;
          content: Array<
            | {
                children?: Array<{
                  marks?: Array<string>;
                  text?: string;
                  _type: "span";
                  _key: string;
                }>;
                style?: "h1" | "h2" | "h3" | "h4" | "normal";
                listItem?: "bullet" | "number";
                markDefs?: Array<{
                  href?: string;
                  _type: "link";
                  _key: string;
                }>;
                level?: number;
                _type: "block";
                _key: string;
              }
            | {
                _key: string;
                _type: "link";
                text?: string;
                type?: string;
                internalLink:
                  | {
                      _type: "homepage";
                      slug: null;
                      title: null;
                    }
                  | {
                      _type: "page";
                      slug: Slug | null;
                      title: string | null;
                    }
                  | null;
                url?: string;
                email?: string;
                phone?: string;
                value?: string;
                blank?: boolean;
                parameters?: string;
                anchor?: string;
              }
          > | null;
          textColor: string | null;
        }
      | {
          _id: string;
          _type: "photoGallery";
          _createdAt: string;
          _updatedAt: string;
          _rev: string;
          title?: string;
          bgColor: string | null;
          photos: Array<{
            caption: string | null;
            assetId: string | null;
            assetPath: string | null;
            aspectRatio: number | null;
          }> | null;
        }
    > | null;
    SEO: {
      _type: "seo";
      metaTitle?: string;
      metaDescription?: string;
      openGraphTitle?: string;
      openGraphDescription?: string;
      openGraphImage: string | null;
      includeInSitemap?: boolean;
      disallowRobots?: boolean;
      initSeo?: boolean;
    } | null;
  } | null;
};

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "{\n    _id,\n    _type,\n    'bgColor': bgColor.hex,\n    photos[] {\n    caption,\n    'assetId': asset->_id,\n    'assetPath': asset->path,\n    'aspectRatio': asset->metadata.dimensions.aspectRatio,\n}\n}": PhotoGalleryDataResult;
    "\n    *[_type == 'siteSettings'][0] {\n        SEO {\n    ...,\n    'openGraphImage': openGraphImage.asset->url,\n},\n    }\n": SiteSettingsQueryResult;
    "{\n    'header': *[_type == 'header'][0] {\n        ...,\n        navList[] {\n            ...,\n            \n  _type == \"link\" => {\n    ...,\n    internalLink->{_type,slug,title}\n  }\n,\n        },\n        mobileNavList[] {\n            ...,\n            \n  _type == \"link\" => {\n    ...,\n    internalLink->{_type,slug,title}\n  }\n,\n        }\n    }\n}": HeaderQueryResult;
    "{\n    'homepage': *[_type == 'homepage'][0] {\n        ...,\n        content[]->{\n    ...,\n    _type == 'centeredText' => {\n    _id,\n    _type,\n    marginY,\n    'bgColor': bgColor.hex,\n    'textColor': textColor.hex,\n    image {\n    caption,\n    'assetId': asset->_id,\n    'assetPath': asset->path,\n    'aspectRatio': asset->metadata.dimensions.aspectRatio,\n},\n    content[] {\n      ...,\n      \n  _type == \"link\" => {\n    ...,\n    internalLink->{_type,slug,title}\n  }\n,\n    },\n},\n    _type == 'photoGallery' => {\n    _id,\n    _type,\n    'bgColor': bgColor.hex,\n    photos[] {\n    caption,\n    'assetId': asset->_id,\n    'assetPath': asset->path,\n    'aspectRatio': asset->metadata.dimensions.aspectRatio,\n}\n},\n},\n        SEO {\n    ...,\n    'openGraphImage': openGraphImage.asset->url,\n},\n    }\n}": HomepageQueryResult;
    "{\n    'page': *[_type == 'page' && $slug == slug.current][0] {\n        ...,\n        title,\n        content[]->{\n    ...,\n    _type == 'centeredText' => {\n    _id,\n    _type,\n    marginY,\n    'bgColor': bgColor.hex,\n    'textColor': textColor.hex,\n    image {\n    caption,\n    'assetId': asset->_id,\n    'assetPath': asset->path,\n    'aspectRatio': asset->metadata.dimensions.aspectRatio,\n},\n    content[] {\n      ...,\n      \n  _type == \"link\" => {\n    ...,\n    internalLink->{_type,slug,title}\n  }\n,\n    },\n},\n    _type == 'photoGallery' => {\n    _id,\n    _type,\n    'bgColor': bgColor.hex,\n    photos[] {\n    caption,\n    'assetId': asset->_id,\n    'assetPath': asset->path,\n    'aspectRatio': asset->metadata.dimensions.aspectRatio,\n}\n},\n},\n        SEO {\n    ...,\n    'openGraphImage': openGraphImage.asset->url,\n},\n    }\n}": PageQueryResult;
  }
}
