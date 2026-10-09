import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrolmentForm from "@/components/EnrolmentForm";
import { getCourseBySlug, formatCourseDate } from "@/lib/public-courses";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getCourseInclusions } from "@/lib/course-inclusions";
export const metadata=pageMetadata({path:"/de/buchung/anmelden",locale:"de",title:"Kurs anmelden",description:"Angaben für die Kursanmeldung vervollständigen.",noindex:true});

export default async function Anmelden({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course: slug } = await searchParams;
  const course = slug ? await getCourseBySlug(slug) : null;
  if (!course) notFound();
  return <><Navbar locale="de" /><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Kursbuchung</p><h1 className="display mt-4 text-5xl font-bold">Platz reservieren.</h1><p className="mt-5 max-w-xl text-slate-600">Vervollständigen Sie Ihre Angaben. Die Zahlung erfolgt im nächsten Schritt.</p><div className="mt-10"><EnrolmentForm locale="de" course={{ id: course.id, title: course.title_de, startDate: formatCourseDate(course.start_date, "de-DE"), inclusions: getCourseInclusions(course.slug,"de") }} /></div></main><Footer locale="de" /></>;
}
