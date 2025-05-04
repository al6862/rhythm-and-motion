import CenteredText from "./CenteredText";
import ClassesSlideshow from "./ClassesSlideshow";
import IGGallery from "./IGGallery";
import ImageText from "./ImageText";
import Hero from "./Hero";
import PhotoGallery from "./PhotoGallery";
import SplitImageAndText from "./SplitImageAndText";
import Teachers from "./Teachers";
import Video from "./Video";
import Partners from "./Partners";
import Community from "./Community";

type Props = {
  data: any[] | null | undefined;
};

export default function Content({ data }: Props) {
  const sections = data
    ? data.map((c) => {
        switch (c._type) {
          case "centeredText":
            return <CenteredText key={c._id} content={c} />;
          case "classesSlideshow":
            return <ClassesSlideshow key={c._id} content={c} />;
          case "community":
            return <Community key={c._id} content={c} />;
          case "igGallery":
            return <IGGallery key={c._id} content={c} />;
          case "imageText":
            return <ImageText key={c._id} content={c} />;
          case "hero":
            return <Hero key={c._id} content={c} />;
          case "partners":
            return <Partners key={c._id} content={c} />;
          case "photoGallery":
            return <PhotoGallery key={c._id} content={c} />;
          case "splitImageAndText":
            return <SplitImageAndText key={c._id} content={c} />;
          case "teachers":
            return <Teachers key={c._id} content={c} />;
          case "video":
            return <Video key={c._id} content={c} />;
          default:
            return (
              <h1 key={c._id} className="text-center">
                No component found for {c._type}
              </h1>
            );
        }
      })
    : [];

  return <>{sections.filter(Boolean)}</>;
}
