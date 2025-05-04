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

export interface CategorizedEvents {
  when: "Upcoming" | "Previous";
  datedEvents: Array<{
    title: string;
    startDate: string;
    endDate: string | null;
  }>;
}

export function categorizeEvents(
  events: Array<{
    title: string;
    startDate: string;
    endDate: string | null;
  }>,
): CategorizedEvents[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  const previousEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  return [
    {
      when: "Upcoming",
      datedEvents: upcomingEvents.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      ),
    },
    {
      when: "Previous",
      datedEvents: previousEvents.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      ),
    },
  ];
}
