import Link from "next/link";
import CourseCardImage from "./CourseCardImage";

export type BookingCourseListItem = {
  id: string; category: string; title: string; description: string; format: string; duration: string;
  startDate: string; schedule: string; seats: number; price: string; imagePath?: string; href: string;
};

const labels = {
  en: { format: "Format", duration: "Duration", starts: "Starts", schedule: "Schedule", availability: "Availability", seats: "seats left", button: "View Course" },
  de: { format: "Format", duration: "Dauer", starts: "Kursbeginn", schedule: "Kurszeiten", availability: "Verfügbarkeit", seats: "Plätze frei", button: "Kurs ansehen" },
};

export default function BookingCourseList({ courses, locale }: { courses: BookingCourseListItem[]; locale: "en" | "de" }) {
  const t = labels[locale];
  return <div className="mt-10 space-y-4">{courses.map((course) => <article key={course.id} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-cobalt hover:shadow-float sm:p-6"><div className="grid gap-5 lg:grid-cols-[9rem_minmax(12rem,1fr)_minmax(19rem,1.7fr)_minmax(14rem,1fr)_auto] lg:items-center"><div className="w-full lg:w-36"><CourseCardImage src={course.imagePath} alt={locale === "de" ? `Kursbild: ${course.title}` : `Course image: ${course.title}`} /></div><div><span className="rounded-lg bg-mist px-2.5 py-1 text-xs font-bold text-cobalt">{course.category}</span><h2 className="display mt-4 text-2xl font-bold">{course.title}</h2></div><p className="text-sm leading-relaxed text-slate-600">{course.description}</p><dl className="grid gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-2 lg:border-t-0 lg:pt-0"><div><dt>{t.format}</dt><dd className="font-semibold text-ink">{course.format}</dd></div><div><dt>{t.duration}</dt><dd className="font-semibold text-ink">{course.duration}</dd></div><div><dt>{t.starts}</dt><dd className="font-semibold text-ink">{course.startDate}</dd></div><div><dt>{t.schedule}</dt><dd className="font-semibold text-ink">{course.schedule}</dd></div><div className="sm:col-span-2"><dt>{t.availability}</dt><dd className="font-semibold text-cobalt">{course.seats} {t.seats}</dd></div></dl><div className="flex flex-col gap-4 lg:items-end"><span className="text-lg font-bold">{course.price}</span><Link href={course.href} className="w-full rounded-full bg-ink px-4 py-3 text-center text-sm font-bold text-white lg:w-auto lg:whitespace-nowrap">{t.button}</Link></div></div></article>)}</div>;
}
