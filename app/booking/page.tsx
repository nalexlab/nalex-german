import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCourseList from "@/components/BookingCourseList";
import { getCourseOverview } from "@/lib/course-overview";
import { getCourseOverviewDestination } from "@/lib/course-overview-destination";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/booking",title:"German Courses & Dates",description:"Browse upcoming online German courses, dates, prices and available places at NALEX LAB."});
export default async function Booking() { const { courses } = await getCourseOverview(); return <><Navbar /><main><section className="grid-lines"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><p className="eyebrow">NALEX LAB booking</p><h1 className="display mt-5 text-5xl font-bold sm:text-7xl">Courses & Dates</h1><p className="mt-5 max-w-xl text-lg text-slate-600">Choose your next chapter, check availability and begin your booking.</p></div></section><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><BookingCourseList locale="en" courses={courses.map((course) => ({ ...course, href: getCourseOverviewDestination(course.slug, "en") ?? `/booking/enrol?course=${encodeURIComponent(course.slug)}` }))} /></section></main><Footer /></>; }
