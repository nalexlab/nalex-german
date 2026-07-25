import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/PaymentForm";
import { getCourseById, formatCourseDate, formatCoursePrice } from "@/lib/public-courses";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/buchung/zahlung",locale:"de",title:"Kurszahlung",description:"Angaben zur Kurszahlung vervollständigen.",noindex:true});
export default async function Zahlung({ searchParams }: { searchParams: Promise<{ course?: string }> }) { const { course: id } = await searchParams; const course = id ? await getCourseById(id) : null; if (!course) notFound(); return <><Navbar locale="de" /><main className="mx-auto max-w-3xl px-5 py-20"><PaymentForm locale="de" course={{ id: course.id, slug: course.slug, title: course.title_de, startDate: formatCourseDate(course.start_date, "de-DE"), schedule: course.schedule_de, price: formatCoursePrice(course.price_cents, course.price_prefix_de), paypalCheckoutUrl: course.paypal_checkout_url }} /></main><Footer locale="de" /></>; }
