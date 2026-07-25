import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrolmentForm from "@/components/EnrolmentForm";
import { getCourseBySlug, formatCourseDate } from "@/lib/public-courses";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({path:"/booking/enrol",title:"Course Enrolment",description:"Complete your course enrolment details.",noindex:true});

export default async function Enrol({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course: slug } = await searchParams;
  const course = slug ? await getCourseBySlug(slug) : null;
  if (!course) notFound();
  return <><Navbar /><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Course booking</p><h1 className="display mt-4 text-5xl font-bold">Reserve your place.</h1><p className="mt-5 max-w-xl text-slate-600">Complete the details below. Payment will be completed in the next step.</p><div className="mt-10"><Suspense fallback={<div className="h-96 rounded-3xl bg-mist" />}><EnrolmentForm course={{ id: course.id, title: course.title_en, startDate: formatCourseDate(course.start_date) }} /></Suspense></div></main><Footer /></>;
}
