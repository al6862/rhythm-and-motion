import { dataset, projectId } from "@/sanity/lib/api";

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "homepage":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

const dayMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDayName = (dayOfWeek: number) => {
  return dayMap[dayOfWeek % 7];
};
