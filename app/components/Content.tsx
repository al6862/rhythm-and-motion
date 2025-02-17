import CenteredText from "./CenteredText";

export default function Content({ data }) {
  const sections = data
    ? data.map((c) => {
        switch (c._type) {
          case "centeredText":
            return <CenteredText key={c._id} content={c} />;

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
