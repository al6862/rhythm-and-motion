import { defineQuery } from "next-sanity";

const seoData = `{
    ...,
    'openGraphImage': openGraphImage.asset->url,
}`;

const contentData = `{
    ...,
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
