import type { Metadata } from "next";

export const siteUrl = "https://nalex-german.de";
const defaultImage = `${siteUrl}/images/courses/default.jpg`;

const equivalents: Record<string, string> = {
  "/": "/de", "/german-courses": "/de/deutschkurse", "/german-courses/a1": "/de/deutschkurse/a1", "/german-courses/a2": "/de/deutschkurse/a2", "/german-courses/b1-b2": "/de/deutschkurse/b1-b2",
  "/professional-german": "/de/deutsch-fuer-den-beruf", "/professional-german/technical-german": "/de/deutsch-fuer-den-beruf/technisches-deutsch", "/reading-club": "/de/leseclub", "/for-companies": "/de/fuer-unternehmen", "/booking": "/de/buchung",
  "/booking/enrol": "/de/buchung/anmelden", "/booking/payment": "/de/buchung/zahlung", "/booking/trial": "/de/buchung/probestunde",
  "/imprint": "/impressum", "/privacy-policy": "/datenschutz", "/terms": "/agb", "/withdrawal": "/widerruf", "/cookie-policy": "/cookies", "/withdraw-from-contract": "/de/vertrag-widerrufen",
};
const reverseEquivalents = Object.fromEntries(Object.entries(equivalents).map(([en, de]) => [de, en]));

export function pageMetadata({ path, title, description, locale = "en", noindex = false }: { path: string; title: string; description: string; locale?: "en" | "de"; noindex?: boolean }): Metadata {
  const equivalent = locale === "en" ? equivalents[path] : reverseEquivalents[path];
  const canonical = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path, ...(equivalent ? { languages: locale === "en" ? { en: path, de: equivalent } : { de: path, en: equivalent } } : {}) },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: { type: "website", siteName: "NALEX LAB", title, description, url: canonical, locale: locale === "de" ? "de_DE" : "en_US", images: [{ url: defaultImage, width: 1200, height: 630, alt: "NALEX LAB" }] },
    twitter: { card: "summary_large_image", title, description, images: [defaultImage] },
  };
}
