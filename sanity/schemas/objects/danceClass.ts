import { getDayName } from "@/sanity/lib/utils";
import { defineField, defineType } from "sanity";

export const danceClass = defineType({
  name: "danceClass",
  title: "Dance Class",
  type: "object",
  fields: [
    defineField({
      name: "classType",
      title: "Class Type",
      type: "link",
      options: {
        enableText: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "link",
      options: {
        enableText: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mode",
      title: "Mode of Instruction",
      type: "string",
      options: {
        list: ["Livestream", "In-person", "Livestream & In-person"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dayOfWeek",
      title: "Day Of Week",
      type: "number",
      description: "Number of the day of the week, 0 = Sunday, 6 = Saturday",
      validation: (Rule) => {
        return Rule.required().min(0).max(6);
      },
    }),
    defineField({
      name: "startTime",
      title: "Class Start Time",
      type: "string",
      description: "Class Start time in 24 hour time",
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: "24‑hour time",
          invert: false,
        }),
    }),
  ],

  preview: {
    select: {
      dayOfWeek: "dayOfWeek",
      startTime: "startTime",
      instructor: "instructor",
    },

    prepare: ({ dayOfWeek, startTime, instructor }) => {
      return {
        title: `${getDayName(dayOfWeek)} - ${startTime} - ${instructor.text}`,
      };
    },
  },
});
