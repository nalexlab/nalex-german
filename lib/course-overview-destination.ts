import type { Locale } from "./locale-routes";

const destinations = {
  en: [
    ["a2", "/german-courses/a2"],
    ["b1-b2", "/german-courses/b1-b2"],
    ["technical-german", "/professional-german/technical-german"],
  ],
  de: [
    ["a2", "/de/deutschkurse/a2"],
    ["b1-b2", "/de/deutschkurse/b1-b2"],
    ["technical-german", "/de/deutsch-fuer-den-beruf/technisches-deutsch"],
  ],
} as const;

export function getCourseOverviewDestination(slug: string, locale: Locale): string | null {
  return destinations[locale].find(([prefix]) => slug.startsWith(prefix))?.[1] ?? null;
}
