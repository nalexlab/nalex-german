import type { MetadataRoute } from "next";

const base = "https://www.nalex-german.de";
const paths = [
  "", "/de",
  "/german-courses/a2", "/german-courses/b1-b2", "/professional-german/technical-german",
  "/de/deutschkurse/a2", "/de/deutschkurse/b1-b2", "/de/deutsch-fuer-den-beruf/technisches-deutsch",
  "/booking", "/de/buchung",
  "/imprint", "/impressum", "/privacy-policy", "/datenschutz", "/terms", "/agb", "/withdrawal", "/widerruf", "/cookie-policy", "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "" || path === "/de" ? 1 : path.includes("german-courses") || path.includes("deutschkurse") || path.includes("technical-german") || path.includes("technisches-deutsch") ? 0.8 : 0.6 }));
}
