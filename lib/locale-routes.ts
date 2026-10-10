export type Locale = "en" | "de";

const routes: Record<string, string> = {
  "/": "/de",
  "/german-courses": "/de/deutschkurse",
  "/german-courses/a2": "/de/deutschkurse/a2",
  "/german-courses/b1-b2": "/de/deutschkurse/b1-b2",
  "/professional-german": "/de/deutsch-fuer-den-beruf",
  "/professional-german/technical-german": "/de/deutsch-fuer-den-beruf/technisches-deutsch",
  "/for-companies": "/de/fuer-unternehmen",
  "/booking": "/de/buchung",
  "/booking/enrol": "/de/buchung/anmelden",
  "/booking/payment": "/de/buchung/zahlung",
  "/booking/trial": "/de/buchung/probestunde",
  "/imprint": "/impressum",
  "/privacy-policy": "/datenschutz",
  "/terms": "/agb",
  "/withdrawal": "/widerruf",
  "/cookie-policy": "/cookies",
  "/withdraw-from-contract": "/de/vertrag-widerrufen",
};

const reverseRoutes = Object.fromEntries(Object.entries(routes).map(([english, german]) => [german, english]));
export const localizedPath = (pathname: string, locale: Locale) => locale === "de" ? (routes[pathname] ?? "/de") : (reverseRoutes[pathname] ?? "/");
