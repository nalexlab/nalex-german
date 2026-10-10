export type Locale = "en" | "de";

const routes: Record<string, string> = {
  "/": "/de",
  "/german-courses/a2": "/de/deutschkurse/a2",
  "/german-courses/b1-b2": "/de/deutschkurse/b1-b2",
  "/professional-german/technical-german": "/de/deutsch-fuer-den-beruf/technisches-deutsch",
  "/booking": "/de/buchung",
  "/imprint": "/impressum",
  "/privacy-policy": "/datenschutz",
  "/terms": "/agb",
  "/withdrawal": "/widerruf",
  "/cookie-policy": "/cookies",
};

const reverseRoutes = Object.fromEntries(Object.entries(routes).map(([english, german]) => [german, english]));
export const localizedPath = (pathname: string, locale: Locale) => locale === "de" ? (routes[pathname] ?? "/de") : (reverseRoutes[pathname] ?? "/");
