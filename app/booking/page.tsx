import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/booking",title:"German Courses & Dates",description:"Browse upcoming online German courses, dates, prices and available places at NALEX LAB."});

const courses = [
  { title: "A2+ Consolidation", schedule: "4 weeks · Mon, Wed, Fri · 12:00–13:30", details: "24 units · €109", included: "Materials included · Course book included" },
  { title: "B1+ Conversation", schedule: "4 weeks · Sat · 11:00–12:30", details: "8 units · €49", included: "Materials included" },
  { title: "Technical German B2+", schedule: "4 weeks · Tue, Thu · 18:00–19:30", details: "16 units · €149", included: "Materials included" },
];

export default function Booking() {
  return <><Navbar /><main><section className="grid-lines"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><h1 className="display text-5xl font-bold sm:text-7xl">Courses &amp; Dates</h1><p className="mt-5 max-w-xl text-lg text-slate-600">Courses start in the first week of each month.</p><p className="mt-5 text-lg text-slate-600">To book a course, please email us at:</p><a className="mt-2 inline-block text-lg font-bold text-cobalt" href="mailto:info@nalex-german.de">info@nalex-german.de</a></div></section><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="space-y-4">{courses.map((course)=><article key={course.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6"><div className="grid gap-5 sm:grid-cols-[minmax(12rem,1fr)_minmax(18rem,1.5fr)] sm:items-center"><h2 className="display text-2xl font-bold">{course.title}</h2><div className="space-y-2 text-sm"><p className="font-semibold text-ink">{course.schedule}</p><p className="font-semibold text-ink">{course.details}</p><p className="font-bold text-cobalt">{course.included}</p></div></div></article>)}</div></section></main><Footer /></>;
}
