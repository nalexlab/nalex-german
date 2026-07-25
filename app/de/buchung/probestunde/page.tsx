import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrialForm from "@/components/TrialForm";
import { getVisibleCourses } from "@/lib/public-courses";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/buchung/probestunde",locale:"de",title:"Kostenlose Probestunde",description:"Kostenlose Deutsch-Probestunde anfragen.",noindex:true});
export default async function Probestunde() { let courses = [] as Awaited<ReturnType<typeof getVisibleCourses>>; try { courses = await getVisibleCourses(); } catch {} return <><Navbar locale="de" /><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Kostenlose Probestunde</p><h1 className="display mt-4 text-5xl font-bold">Lernen wir uns kennen.</h1><p className="mt-5 text-slate-600">Erzählen Sie uns von Ihrem Niveau und Ihren Zielen.</p><div className="mt-10"><TrialForm locale="de" courses={courses.map((course) => ({ id: course.id, title: course.title_de }))} /></div></main><Footer locale="de" /></>; }
