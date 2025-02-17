import { defineQuery } from "next-sanity";

const seoData = `{
    ...,
    'openGraphImage': openGraphImage.asset->url,
}`;

const imageData = `{
    caption,
    'assetId': asset->_id,
    'assetPath': asset->path,
    'aspectRatio': asset->metadata.dimensions.aspectRatio,
}`;

const linkTypeData = `
  _type == "link" => {
    ...,
    internalLink->{_type,slug,title}
  }
`;

const centeredTextData = `{
    _id,
    _type,
    marginY,
    'bgColor': bgColor.hex,
    'textColor': textColor.hex,
    image ${imageData},
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const contentData = `{
    ...,
    _type == 'centeredText' => ${centeredTextData},
}`;

export const siteSettingsQuery = defineQuery(`
    *[_type == 'siteSettings'][0] {
        seo ${seoData},
    }
`);

export const homepageQuery = defineQuery(`{
    'homepage': *[_type == 'homepage'][0] {
        ...,
        content[]->${contentData},
        seo ${seoData},
    }
}`);

export const pageQuery = defineQuery(`{
    'page': *[_type == 'page' && $slug == slug.current][0] {
        title,
        content[]->${contentData},
        seo ${seoData},
    }
}`);
