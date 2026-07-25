import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCourseList from "@/components/BookingCourseList";
import { getCourseOverview } from "@/lib/course-overview";
import { getCourseOverviewDestination } from "@/lib/course-overview-destination";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/buchung",locale:"de",title:"Deutschkurse & Termine",description:"Aktuelle Deutschkurse, Starttermine, Preise und freie Plätze bei NALEX LAB ansehen."});
export default async function Buchung() { const { courses } = await getCourseOverview("de"); return <><Navbar locale="de" /><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="eyebrow">Kurse &amp; Termine</p><h1 className="display mt-4 text-5xl font-bold">Finden Sie Ihren Kurs.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">Wählen Sie einen Kurs, einen Starttermin und die passende Buchungsoption.</p><BookingCourseList locale="de" courses={courses.map((course) => ({ ...course, href: getCourseOverviewDestination(course.slug, "de") ?? `/de/buchung/anmelden?course=${encodeURIComponent(course.slug)}` }))} /></main><Footer locale="de" /></>; }
