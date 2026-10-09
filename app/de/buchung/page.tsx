import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/buchung",locale:"de",title:"Deutschkurse & Termine",description:"Aktuelle Deutschkurse, Starttermine, Preise und freie Plätze bei NALEX LAB ansehen."});

const courses = [
  { title: "A2+ Vertiefung", schedule: "4 Wochen · Mo, Mi, Fr · 12:00–13:30", details: "24 UE · 109 €", included: "Materialien inklusive · Kursbuch inklusive" },
  { title: "B1+ Konversation", schedule: "4 Wochen · Sa · 11:00–12:30", details: "8 UE · 49 €", included: "Materialien inklusive" },
  { title: "Technisches Deutsch B2+", schedule: "4 Wochen · Di, Do · 18:00–19:30", details: "16 UE · 149 €", included: "Materialien inklusive" },
];

export default function Buchung() {
  return <><Navbar locale="de" /><main><section className="grid-lines"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><h1 className="display text-5xl font-bold sm:text-7xl">Kurse &amp; Termine</h1><p className="mt-5 max-w-xl text-lg text-slate-600">Die Kurse starten jeweils in der ersten Woche des Monats.</p><p className="mt-5 text-lg text-slate-600">Für die Buchung schreiben Sie uns bitte an:</p><a className="mt-2 inline-block text-lg font-bold text-cobalt" href="mailto:info@nalex-german.de">info@nalex-german.de</a></div></section><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="space-y-4">{courses.map((course)=><article key={course.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6"><div className="grid gap-5 sm:grid-cols-[minmax(12rem,1fr)_minmax(18rem,1.5fr)] sm:items-center"><h2 className="display text-2xl font-bold">{course.title}</h2><div className="space-y-2 text-sm"><p className="font-semibold text-ink">{course.schedule}</p><p className="font-semibold text-ink">{course.details}</p><p className="font-bold text-cobalt">{course.included}</p></div></div></article>)}</div></section></main><Footer locale="de" /></>;
}
