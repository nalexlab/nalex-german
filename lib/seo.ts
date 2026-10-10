import type { Metadata } from "next";

export const siteUrl = "https://www.nalex-german.de";
const defaultImage = `${siteUrl}/images/courses/default.jpg`;

const equivalents: Record<string, string> = {
  "/": "/de", "/german-courses/a2": "/de/deutschkurse/a2", "/german-courses/b1-b2": "/de/deutschkurse/b1-b2",
  "/professional-german/technical-german": "/de/deutsch-fuer-den-beruf/technisches-deutsch", "/booking": "/de/buchung",
  "/imprint": "/impressum", "/privacy-policy": "/datenschutz", "/terms": "/agb", "/withdrawal": "/widerruf", "/cookie-policy": "/cookies",
};
const reverseEquivalents = Object.fromEntries(Object.entries(equivalents).map(([en, de]) => [de, en]));

export function pageMetadata({ path, title, description, locale = "en", noindex = false }: { path: string; title: string; description: string; locale?: "en" | "de"; noindex?: boolean }): Metadata {
  const equivalent = locale === "en" ? equivalents[path] : reverseEquivalents[path];
  const canonical = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical, ...(equivalent ? { languages: locale === "en" ? { en: canonical, de: `${siteUrl}${equivalent}` } : { de: canonical, en: `${siteUrl}${equivalent}` } } : {}) },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: { type: "website", siteName: "NALEX LAB", title, description, url: canonical, locale: locale === "de" ? "de_DE" : "en_US", images: [{ url: defaultImage, width: 1200, height: 630, alt: "NALEX LAB" }] },
    twitter: { card: "summary_large_image", title, description, images: [defaultImage] },
  };
}
