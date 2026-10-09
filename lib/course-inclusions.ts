import type { Locale } from "./locale-routes";

export function getCourseInclusions(slug: string, locale: Locale): string[] {
  const materials = locale === "de" ? "Materialien inklusive" : "Materials included";
  if (slug.startsWith("a2")) return [materials, locale === "de" ? "Kursbuch inklusive" : "Course book included"];
  if (slug.startsWith("b1-b2") || slug.startsWith("technical-german")) return [materials];
  return [];
}
