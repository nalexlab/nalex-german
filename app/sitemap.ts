import type { MetadataRoute } from "next";

const base = "https://nalex-german.de";
const paths = [
  "", "/de",
  "/german-courses", "/german-courses/a1", "/german-courses/a2", "/german-courses/b1-b2",
  "/de/deutschkurse", "/de/deutschkurse/a1", "/de/deutschkurse/a2", "/de/deutschkurse/b1-b2",
  "/professional-german", "/de/deutsch-fuer-den-beruf", "/de/deutsch-fuer-den-beruf/business-deutsch", "/de/deutsch-fuer-den-beruf/technisches-deutsch",
  "/reading-club", "/de/leseclub", "/for-companies", "/de/fuer-unternehmen", "/booking", "/de/buchung",
  "/imprint", "/impressum", "/privacy-policy", "/datenschutz", "/terms", "/agb", "/withdrawal", "/widerruf", "/cookie-policy", "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "" || path === "/de" ? 1 : path.includes("german-courses") || path.includes("deutschkurse") ? 0.8 : 0.6 }));
}
