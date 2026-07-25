import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrialForm from "@/components/TrialForm";
import { getVisibleCourses } from "@/lib/public-courses";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/booking/trial",title:"Free Trial Lesson",description:"Request a free German trial lesson.",noindex:true});
export default async function Trial() { const courses = await getVisibleCourses(); return <><Navbar /><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Free trial lesson</p><h1 className="display mt-4 text-5xl font-bold">Start with a conversation.</h1><p className="mt-5 max-w-xl text-slate-600">Tell us what you want to learn and when you would like to meet.</p><div className="mt-10"><TrialForm courses={courses.map(({ id, title_en: title }) => ({ id, title }))} /></div></main><Footer /></>; }
