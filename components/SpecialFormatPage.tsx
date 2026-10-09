import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Clock3, Monitor } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CourseStructuredData } from "./StructuredData";
import type { Locale } from "@/lib/locale-routes";

type FormatPageProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  duration: string;
  schedule: string;
  units: string;
  price: string;
  purposeTitle: string;
  purpose: string;
  boundary: string;
  audienceTitle: string;
  audience: string;
  contentTitle: string;
  content: string[];
  included: string[];
  emphasizeIncluded?: boolean;
  accent?: "course" | "technical";
  schema: { name: string; description: string; price: string; url: string; workload: string };
};

export default function SpecialFormatPage({ locale, eyebrow, title, intro, duration, schedule, units, price, purposeTitle, purpose, boundary, audienceTitle, audience, contentTitle, content, included, emphasizeIncluded = false, accent = "course", schema }: FormatPageProps) {
  const de = locale === "de";
  const technical = accent === "technical";
  const facts = [
    [de ? "Dauer" : "Duration", duration, CalendarDays],
    [de ? "Zeiten" : "Schedule", schedule, Clock3],
    [de ? "Unterricht" : "Tuition", units, Monitor],
    [de ? "Preis" : "Price", price, Check],
  ] as const;

  return <><CourseStructuredData locale={locale} name={schema.name} description={schema.description} price={schema.price} url={schema.url} workload={schema.workload} /><Navbar locale={locale} /><main>
    <section className={`relative overflow-hidden ${technical ? "bg-ink text-white" : "grid-lines"}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-28">
        <div><p className={`eyebrow ${technical ? "text-lime" : ""}`}>{eyebrow}</p><h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-[.96] sm:text-7xl">{title}</h1><p className={`mt-7 max-w-2xl text-xl leading-relaxed ${technical ? "text-slate-300" : "text-slate-600"}`}>{intro}</p><div className="mt-9 flex flex-wrap gap-3"><Link href={de ? "/de/buchung" : "/booking"} className={`inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${technical ? "bg-lime text-ink" : "bg-cobalt text-white hover:bg-ink"}`}>{de ? "Termine ansehen" : "View dates"}<ArrowRight size={16} /></Link><Link href={de ? "/de" : "/"} className={`rounded-full border px-5 py-3.5 text-sm font-bold ${technical ? "border-white/20 text-white" : "border-slate-200 bg-white"}`}>{de ? "Alle Formate" : "All formats"}</Link></div></div>
        <div className={`grid content-start gap-3 rounded-[2rem] p-6 sm:p-8 ${technical ? "bg-white/10" : "bg-white shadow-float"}`}>{facts.map(([label, value, Icon]) => <div key={label} className={`flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0 ${technical ? "border-white/10" : "border-slate-100"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${technical ? "bg-lime text-ink" : "bg-mist text-cobalt"}`}><Icon size={19} /></span><div><p className={`text-xs font-bold uppercase tracking-widest ${technical ? "text-slate-400" : "text-slate-400"}`}>{label}</p><p className="mt-1 font-bold">{value}</p></div></div>)}<div className={`flex items-start gap-4 border-t pt-4 ${technical ? "border-white/10" : "border-slate-100"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${technical ? "bg-lime text-ink" : "bg-mist text-cobalt"}`}><Check size={19}/></span><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{de ? "Inklusive" : "Included"}</p>{included.map((item)=><p key={item} className={`mt-1 ${emphasizeIncluded ? "font-bold" : ""}`}>{item}</p>)}</div></div></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-5 lg:grid-cols-3"><article className="rounded-2xl border border-slate-200 p-7"><p className="eyebrow">01</p><h2 className="display mt-4 text-3xl font-bold">{purposeTitle}</h2><p className="mt-5 leading-relaxed text-slate-600">{purpose}</p></article><article className="rounded-2xl border border-slate-200 p-7"><p className="eyebrow">02</p><h2 className="display mt-4 text-3xl font-bold">{audienceTitle}</h2><p className="mt-5 leading-relaxed text-slate-600">{audience}</p></article><article className={`rounded-2xl p-7 ${technical ? "bg-ink text-white" : "bg-mist"}`}><p className={`eyebrow ${technical ? "text-lime" : ""}`}>03</p><h2 className="display mt-4 text-3xl font-bold">{contentTitle}</h2><ul className={`mt-6 space-y-3 ${technical ? "text-slate-300" : "text-slate-600"}`}>{content.map((item) => <li key={item} className="flex gap-3"><Check size={18} className={`mt-0.5 shrink-0 ${technical ? "text-lime" : "text-cobalt"}`} />{item}</li>)}</ul></article></div><div className="mt-8 rounded-2xl border-l-4 border-cobalt bg-mist p-6"><p className="font-semibold text-ink">{boundary}</p></div></section>
    <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"><div className={`flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:p-12 ${technical ? "bg-ink text-white" : "bg-cobalt text-white"}`}><div><p className={`eyebrow ${technical ? "text-lime" : "text-blue-100"}`}>NALEX LAB</p><h2 className="display mt-3 text-4xl font-bold">{de ? "Nächsten Termin auswählen" : "Choose your next date"}</h2></div><Link href={de ? "/de/buchung" : "/booking"} className={`inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold ${technical ? "bg-lime text-ink" : "bg-white text-cobalt"}`}>{de ? "Kurse & Termine" : "Courses & dates"}<ArrowRight size={16} /></Link></div></section>
  </main><Footer locale={locale} /></>;
}
