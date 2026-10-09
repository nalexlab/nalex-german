import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/PaymentForm";
import { getCourseById, formatCourseDate, formatCoursePriceForSlug } from "@/lib/public-courses";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/booking/payment",title:"Course Payment",description:"Complete your course payment details.",noindex:true});
export default async function Payment({ searchParams }: { searchParams: Promise<{ course?: string }> }) { const { course: id } = await searchParams; const course = id ? await getCourseById(id) : null; if (!course) notFound(); return <><Navbar /><main className="mx-auto max-w-3xl px-5 py-20"><Suspense fallback={<div className="h-96 rounded-3xl bg-mist" />}><PaymentForm course={{ id: course.id, slug: course.slug, title: course.title_en, startDate: formatCourseDate(course.start_date), schedule: course.schedule_en, price: formatCoursePriceForSlug(course.slug, course.price_cents, course.price_prefix_en, "en"), paypalCheckoutUrl: course.paypal_checkout_url }} /></Suspense></main><Footer /></>; }
