import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConcreteCourseImage from "./ConcreteCourseImage";
import { formatCourseDate, formatCoursePrice, getCoursesByCategory, getCoursesBySlugPrefixAndCategory, type PublicCourse } from "@/lib/public-courses";

export function ConcreteCourseCards({ courses }: { courses: PublicCourse[] }) { return <div className="mt-10 grid gap-4 lg:grid-cols-3">{courses.map((course) => <article key={course.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition hover:-translate-y-1 hover:shadow-float"><ConcreteCourseImage src={course.image_path} alt=""/><div className="flex flex-1 flex-col p-7"><div className="flex items-start justify-between gap-4"><span className="rounded-xl bg-mist px-3 py-2 text-sm font-bold text-cobalt">{course.category}</span><span className="text-sm font-bold">{formatCoursePrice(course.price_cents, course.slug.startsWith("business-german") || course.slug.startsWith("technical-german") ? null : course.price_prefix_en)}</span></div><h2 className="display mt-10 text-3xl font-bold">{course.title_en}</h2><p className="mt-4 leading-relaxed text-slate-600">{course.description_en}</p><dl className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500"><div className="flex justify-between gap-3"><dt>Starts</dt><dd className="text-right font-semibold text-ink">{formatCourseDate(course.start_date)}</dd></div><div className="flex justify-between gap-3"><dt>Schedule</dt><dd className="text-right font-semibold text-ink">{course.schedule_en}</dd></div><div className="flex justify-between gap-3"><dt>Duration</dt><dd className="font-semibold text-ink">{course.duration_weeks} weeks</dd></div><div className="flex justify-between gap-3"><dt>Format</dt><dd className="text-right font-semibold text-ink">{course.format_en}</dd></div><div className="flex justify-between gap-3"><dt>Available seats</dt><dd className="font-semibold text-cobalt">{course.seats_available}</dd></div></dl><Link href={`/booking/enrol?course=${encodeURIComponent(course.slug)}`} className="mt-8 rounded-full bg-ink px-4 py-3 text-center text-sm font-bold text-white">Book this course</Link></div></article>)}</div>; }

export default async function ConcreteCourseListPage({ title, description, category, slugPrefix, afterContent }: { title: string; description: string; category: string; slugPrefix?: string; afterContent?: ReactNode }) {
  let courses: PublicCourse[] = [];
  let courseDataUnavailable = false;
  try {
    courses = slugPrefix ? await getCoursesBySlugPrefixAndCategory(slugPrefix, category) : await getCoursesByCategory(category);
  } catch {
    courseDataUnavailable = true;
  }

  return <><Navbar/><main><section className="grid-lines"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><p className="eyebrow">NALEX LAB courses</p><h1 className="display mt-5 text-5xl font-bold sm:text-7xl">{title}</h1><p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-600">{description}</p></div></section><section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="max-w-2xl"><p className="eyebrow">Upcoming courses</p><h2 className="display mt-4 text-4xl font-bold sm:text-5xl">Choose your next start date.</h2></div>{courses.length > 0 ? <ConcreteCourseCards courses={courses}/> : <p className="mt-10 text-lg leading-relaxed text-slate-600">{courseDataUnavailable ? "Course information is temporarily unavailable. Please try again shortly." : "There are no upcoming courses in this category at the moment. Please check back soon."}</p>}</section>{afterContent}</main><Footer/></>;
}
