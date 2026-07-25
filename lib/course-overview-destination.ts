import type { Locale } from "./locale-routes";

const destinations = {
  en: [
    ["a1", "/german-courses/a1"],
    ["a2", "/german-courses/a2"],
    ["b1-b2", "/german-courses/b1-b2"],
    ["business-german", "/professional-german"],
    ["technical-german", "/professional-german"],
    ["reading-club", "/reading-club"],
  ],
  de: [
    ["a1", "/de/deutschkurse/a1"],
    ["a2", "/de/deutschkurse/a2"],
    ["b1-b2", "/de/deutschkurse/b1-b2"],
    ["business-german", "/de/deutsch-fuer-den-beruf/business-deutsch"],
    ["technical-german", "/de/deutsch-fuer-den-beruf/technisches-deutsch"],
    ["reading-club", "/de/leseclub"],
  ],
} as const;

export function getCourseOverviewDestination(slug: string, locale: Locale): string | null {
  return destinations[locale].find(([prefix]) => slug.startsWith(prefix))?.[1] ?? null;
}
