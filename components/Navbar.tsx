"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/locale-routes";

const englishLinks = [
  ["Home", "/"], ["A2+ Consolidation", "/german-courses/a2"], ["B1+ Conversation", "/german-courses/b1-b2"],
  ["Technical German", "/professional-german/technical-german"], ["About", "/#about"], ["Contact", "/#contact"],
];
const germanLinks = [
  ["Start", "/de"], ["A2+ Vertiefung", "/de/deutschkurse/a2"], ["B1+ Konversation", "/de/deutschkurse/b1-b2"],
  ["Technisches Deutsch", "/de/deutsch-fuer-den-beruf/technisches-deutsch"], ["Über NALEX", "/de#about"], ["Kontakt", "/de#contact"],
];

export default function Navbar({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "de" : "en";
  const switchHref = `${localizedPath(pathname, otherLocale)}${query ? `?${query}` : ""}`;
  const links = locale === "en" ? englishLinks : germanLinks;
  const coursesLabel = locale === "en" ? "Dates & Prices" : "Termine & Preise";

  useEffect(() => setQuery(window.location.search.slice(1)), []);

  return <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link href={locale === "en" ? "/" : "/de"} className="flex items-center gap-2 font-bold tracking-[-.07em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-lg text-white">N</span><span>NALEX <i className="font-normal not-italic text-slate-400">LAB</i></span></Link>
      <nav className="hidden items-center gap-5 text-[13px] font-semibold lg:flex">{links.map(([label, href]) => <Link key={label} href={href} className="whitespace-nowrap transition hover:text-cobalt">{label}</Link>)}<Link href={locale === "en" ? "/booking" : "/de/buchung"} className="ml-1 rounded-full bg-ink px-4 py-2.5 text-white transition hover:bg-cobalt">{coursesLabel}</Link><Link href={switchHref} className="whitespace-nowrap text-cobalt">{locale === "en" ? "DE" : "EN"}</Link></nav>
      <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 font-medium">{label}</Link>)}<Link href={locale === "en" ? "/booking" : "/de/buchung"} className="mt-4 block rounded-xl bg-ink p-3 text-center font-semibold text-white">{coursesLabel}</Link><Link href={switchHref} onClick={() => setOpen(false)} className="mt-3 block text-center font-bold text-cobalt">{locale === "en" ? "Deutsch" : "English"}</Link></div>}
  </header>;
}
