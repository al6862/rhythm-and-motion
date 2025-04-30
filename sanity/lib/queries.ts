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

const photoGalleryData = defineQuery(`{
    _id,
    _type,
    'bgColor': bgColor.hex,
    photos[] ${imageData}
}`);

const classesSlideshowData = `{
    _id,
    classes[] {
    ...,
    image ${imageData},
    'bgColor': bgColor.hex,
    'video': video.asset->url,
    },
    ${linkTypeData}
}`;

const imageTextData = `{
    _id,
    ...,
    image ${imageData},
    'bgColor': bgColor.hex,
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const heroData = `{
    _id,
    title,
    header,
    content,
    featuredImages[] ${imageData},
    secondaryImages[] ${imageData},
}`;

const splitImageAndTextData = `{
    _id,
    layout,
    'bgColor': bgColor.hex,    
    'textColor': textColor.hex,
    image ${imageData},
    header,
    content[] {
      ...,
      ${linkTypeData},
    },
}`;

const videoData = `{
    _id,
    'video': video.asset->url,
    hasBorder,
    'borderColor': borderColor.hex,
}`;

const danceClassData = `{
    _id,
    _type,
    classType {
        ...,
        ${linkTypeData},
    },
    instructor {
        ...,
        ${linkTypeData},
    },
    mode,
    dayOfWeek,
    startTime,
}`;

const danceStudioData = `{
    _id,
    header {
        studioTitle,
        studioSubTitle,
    },
    studioAddress,
    location,
    slug,
    studioDescription[] {
        ...,
        ${linkTypeData},
    },
    'bgColor': bgColor.hex,    
    image ${imageData},
    danceClasses[] ${danceClassData},
    partnerSite {
        ...,
        ${linkTypeData},
    },
    partnerLink {
        ...,
        ${linkTypeData},
    }
}`;

const partnersData = `{
    _id,
    _type,
    title,
    header,
    'bgColor': bgColor.hex,    
    image ${imageData},
    studios[] -> ${danceStudioData},
    link {
        ...,
        ${linkTypeData},
    }
}`;

const teacherData = `{
    ...,
    name,
    slug,
    pronouns,
    image ${imageData},
    blurb,
    studio {
        ...,
        ${linkTypeData},
    },
    ${linkTypeData}    
}`;

const teachersData = `{
    _id,
    _type,
    title,
    header,
    'bgColor': bgColor.hex,    
    image ${imageData},
    teachers[] ${teacherData},
}`;

const contentData = `{
    ...,
    _type == 'centeredText' => ${centeredTextData},
    _type == 'classesSlideshow' => ${classesSlideshowData},
    _type == 'imageText' => ${imageTextData},
    _type == 'hero' => ${heroData},
    _type == 'partners' => ${partnersData},
    _type == 'photoGallery' => ${photoGalleryData},
    _type == 'splitImageAndText' => ${splitImageAndTextData},
    _type == 'teachers' => ${teachersData},
    _type == 'video' => ${videoData},
}`;

export const partnersQuery = defineQuery(`{
    'partners': *[_type == 'partners'][0] ${partnersData},
    
}`);

export const teachersQuery = defineQuery(`{
    'teachers': *[_type == 'teachers'][0] ${teachersData},
}`);

export const siteSettingsQuery = defineQuery(`
    *[_type == 'siteSettings'][0] {
        SEO ${seoData},
    }
`);

export const headerQuery = defineQuery(`{
    'header': *[_type == 'header'][0] {
        navList[] {
            ...,
            ${linkTypeData},
        },
        mobileNavList[] {
            ...,
            ${linkTypeData},
        }
    }
}`);

export const footerQuery = defineQuery(`{
    'footer': *[_type == 'footer'][0] {
        linkLists[] {
            links [] {
                ...,
                ${linkTypeData},
            },
        },   
        newsletterContent[] {
            ...,
            ${linkTypeData},
        },
        footerContent[] {
            ...,
            ${linkTypeData},
        },
    }
}`);

export const homepageQuery = defineQuery(`{
    'homepage': *[_type == 'homepage'][0] {
        ...,
        content[]->${contentData},
        SEO ${seoData},
    }
}`);

export const pageQuery = defineQuery(`{
    'page': *[_type == 'page' && $slug == slug.current][0] {
        ...,
        title,
        content[]->${contentData},
        SEO ${seoData},
    }
}`);
