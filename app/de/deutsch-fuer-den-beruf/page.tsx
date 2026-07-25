import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { GermanCourseCards } from "@/components/GermanCourseList";
import { getCoursesBySlugPrefix, type PublicCourse } from "@/lib/public-courses";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({path:"/de/deutsch-fuer-den-beruf",locale:"de",title:"Deutsch für den Beruf",description:"Berufsbezogene Deutschkurse für Meetings, Projekte, technische Kommunikation und internationale Teams."});

const offers: Array<[string, string[], string]> = [
  ["Business-Deutsch", ["Meetings", "Verhandlungen", "Präsentationen", "E-Mails", "Kundenkommunikation"], "/de/deutsch-fuer-den-beruf/business-deutsch"],
  ["Technisches Deutsch", ["Ingenieurprojekte", "Technische Meetings", "Dokumentation", "Factory Acceptance Tests", "Projektmanagement", "Kundenkommunikation"], "/de/deutsch-fuer-den-beruf/technisches-deutsch"],
];

export default async function Beruf() {
  let businessCourses: PublicCourse[] = [];
  let technicalCourses: PublicCourse[] = [];
  let courseDataUnavailable = false;
  try { [businessCourses, technicalCourses] = await Promise.all([getCoursesBySlugPrefix("business-german"), getCoursesBySlugPrefix("technical-german")]); } catch { courseDataUnavailable = true; }
  return <><Navbar locale="de" /><main><section className="grid-lines"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><p className="eyebrow">B1–C1 für Berufstätige</p><h1 className="display mt-5 text-5xl font-bold sm:text-7xl">Deutsch für den Beruf</h1><p className="mt-5 text-xl font-medium text-slate-600">Echte Projekte. Echte Kommunikation.</p><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">Entwickeln Sie die Deutschkenntnisse, die Sie für Ihre berufliche Laufbahn brauchen.</p></div></section><section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-4 md:grid-cols-2">{offers.map(([title, items]) => <article key={title} className="rounded-2xl border border-slate-200 p-7"><p className="eyebrow">Spezialkurs</p><h2 className="display mt-4 text-4xl font-bold">{title}</h2><ul className="mt-8 space-y-3">{items.map((item) => <li key={item} className="flex items-center gap-3 text-slate-600"><Check size={17} className="text-cobalt" />{item}</li>)}</ul><Link href="/de/buchung/probestunde" className="mt-9 inline-flex text-sm font-bold text-cobalt">Kostenlose Probestunde buchen</Link></article>)}</div></section><section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"><div className="max-w-2xl"><p className="eyebrow">Kommende Kurse</p><h2 className="display mt-4 text-4xl font-bold sm:text-5xl">Wählen Sie Ihren nächsten Starttermin.</h2></div>{courseDataUnavailable?<p className="mt-10 text-lg leading-relaxed text-slate-600">Kursinformationen sind vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.</p>:businessCourses.length||technicalCourses.length?<div className="mt-10 space-y-16">{businessCourses.length>0&&<div><h3 className="display text-3xl font-bold">Business-Deutsch</h3><GermanCourseCards courses={businessCourses}/></div>}{technicalCourses.length>0&&<div><h3 className="display text-3xl font-bold">Technisches Deutsch</h3><GermanCourseCards courses={technicalCourses}/></div>}</div>:<p className="mt-10 text-lg leading-relaxed text-slate-600">Derzeit gibt es keine kommenden Berufssprachkurse. Schauen Sie bald wieder vorbei.</p>}</section><section id="contact" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"><div className="grid gap-10 rounded-[2rem] bg-ink p-7 text-white sm:p-10 lg:grid-cols-2 lg:p-14"><div><p className="eyebrow text-lime">Ihre Arbeit verständlich machen</p><h2 className="display mt-4 text-5xl font-bold">Deutsch für die Arbeit, die zählt.</h2><p className="mt-6 max-w-md text-lg text-slate-300">Buchen Sie eine kostenlose Probestunde und sprechen Sie über Ihre Rolle, Ziele und beruflichen Situationen.</p></div><ContactForm locale="de" /></div></section></main><Footer locale="de" /></>;
}
