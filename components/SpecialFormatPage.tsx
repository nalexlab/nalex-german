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
  showIndividualTraining?: boolean;
  accent?: "course" | "technical";
  schema: { name: string; description: string; price: string; url: string; workload: string };
};

export default function SpecialFormatPage({ locale, eyebrow, title, intro, duration, schedule, units, price, purposeTitle, purpose, boundary, audienceTitle, audience, contentTitle, content, included, emphasizeIncluded = false, accent = "course", schema, showIndividualTraining = false }: FormatPageProps) {
  const de = locale === "de";
  const technical = accent === "technical";
  const CardHeading = technical ? "h3" : "h2";
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
    {technical && showIndividualTraining && (
      <section aria-labelledby="technical-course-approach" className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="rounded-[2rem] bg-ink px-7 py-10 text-white sm:px-12 sm:py-14 lg:px-16">
          <p className="eyebrow text-lime">{de ? "WARUM NALEX LAB?" : "WHY NALEX LAB?"}</p>
          <h2 id="technical-course-approach" className="display mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
            {de ? "Aus der Industrie. Für die Projektpraxis." : "Industry experience. Real project communication."}
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-relaxed sm:text-xl">
            {de ? "Unsere Trainer verbinden Erfahrung aus der technischen Industrie mit professioneller Sprachvermittlung." : "Our trainers combine experience in technical industry with professional language teaching."}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-200">
            {de ? "Bei uns bleiben Grammatik und Fachwortschatz nicht Theorie. Sie wenden Deutsch in einer realitätsnahen Projektsimulation an: Sie übernehmen Rollen, klären Anforderungen, besprechen technische Probleme und begründen Entscheidungen." : "Grammar and technical vocabulary do not remain theory. You apply German in a realistic project simulation: take on roles, clarify requirements, discuss technical problems and explain decisions."}
          </p>
          <p className="mt-6 max-w-3xl border-l-4 border-lime pl-4 text-lg font-bold leading-relaxed sm:text-xl">
            {de ? "Sie lernen nicht nur, wie man etwas auf Deutsch sagt. Sie üben, wie man in einem technischen Projekt auf Deutsch handelt." : "You do not just learn what to say in German. You practise communicating and taking action in German during a technical project."}
          </p>
        </div>
      </section>
    )}
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">{technical && <h2 className="display mb-8 text-4xl font-bold">{de ? "Das trainieren Sie im Gruppenkurs" : "What you practise in the group course"}</h2>}<div className="grid gap-5 lg:grid-cols-3"><article className="rounded-2xl border border-slate-200 p-7"><p className="eyebrow">01</p><CardHeading className="display mt-4 text-3xl font-bold">{purposeTitle}</CardHeading><p className="mt-5 leading-relaxed text-slate-600">{purpose}</p></article><article className="rounded-2xl border border-slate-200 p-7"><p className="eyebrow">02</p><CardHeading className="display mt-4 text-3xl font-bold">{audienceTitle}</CardHeading><p className="mt-5 leading-relaxed text-slate-600">{audience}</p></article><article className={`rounded-2xl p-7 ${technical ? "bg-ink text-white" : "bg-mist"}`}><p className={`eyebrow ${technical ? "text-lime" : ""}`}>03</p><CardHeading className="display mt-4 text-3xl font-bold">{contentTitle}</CardHeading><ul className={`mt-6 space-y-3 ${technical ? "text-slate-300" : "text-slate-600"}`}>{content.map((item) => <li key={item} className="flex gap-3"><Check size={18} className={`mt-0.5 shrink-0 ${technical ? "text-lime" : "text-cobalt"}`} />{item}</li>)}</ul></article></div><div className="mt-8 rounded-2xl border-l-4 border-cobalt bg-mist p-6"><p className="font-semibold text-ink">{boundary}</p></div></section>
    {showIndividualTraining && (
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-white/20 bg-[#0f3d26] p-7 text-white sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:p-12">
          <div>
            <h2 className="display text-4xl font-bold">{de ? "Technisches Deutsch im Einzeltraining" : "Technical German 1:1"}</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-white">
              <p>{de ? "Individuelles Online Sprachtraining für Ingenieure und technische Fachkräfte." : "Individual online training for engineers and technical professionals."}</p>
              <p>{de ? "Sie arbeiten gezielt an der deutschen Fachsprache Ihres eigenen technischen Arbeitsgebiets. Die Trainingsinhalte richten sich nach Ihren beruflichen Aufgaben und sprachlichen Anforderungen." : "Develop the German technical language skills you need in your own professional field. The training content is tailored to your work, technical topics and communication needs."}</p>
              <p>{de ? "Im Mittelpunkt stehen technischer Fachwortschatz, das Erklären komplexer Sachverhalte, Projektkommunikation sowie die sprachliche Vorbereitung auf Besprechungen und Präsentationen." : "Focus on technical vocabulary, explaining complex processes, project communication and preparing for meetings and presentations in German."}</p>
            </div>
            <Link href={de ? "/de#contact" : "/#contact"} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-[#0f3d26] hover:bg-white/90">
              {de ? "Einzeltraining anfragen" : "Enquire about individual training"}<ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid content-start gap-3 rounded-2xl p-6 text-gray-200 sm:p-8">
            <li>{de ? "Umfang: 12 UE à 45 Minuten" : "Duration: 12 teaching units of 45 minutes"}</li>
            <li>{de ? "Termine: 6 Termine à 90 Minuten" : "Sessions: 6 sessions of 90 minutes"}</li>
            <li>{de ? "Zeitraum: 6 Wochen, einmal pro Woche" : "Schedule: 6 weeks, once per week"}</li>
            <li>{de ? "Beginn: Nach individueller Vereinbarung" : "Start: By individual arrangement"}</li>
            <li className="font-bold text-white">{de ? "Preis: 499 €" : "Price: €499"}</li>
            <li>{de ? "Unterrichtsmaterialien inklusive" : "Learning materials included"}</li>
          </ul>
        </div>
      </section>
    )}
    <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"><div className={`flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:p-12 ${technical ? "bg-ink text-white" : "bg-cobalt text-white"}`}><div><p className={`eyebrow ${technical ? "text-lime" : "text-blue-100"}`}>NALEX LAB</p><h2 className="display mt-3 text-4xl font-bold">{de ? "Nächsten Termin auswählen" : "Choose your next date"}</h2></div><Link href={de ? "/de/buchung" : "/booking"} className={`inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold ${technical ? "bg-lime text-ink" : "bg-white text-cobalt"}`}>{de ? "Kurse & Termine" : "Courses & dates"}<ArrowRight size={16} /></Link></div></section>
  </main><Footer locale={locale} /></>;
}
