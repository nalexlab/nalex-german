import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminCourseManagement from "@/components/AdminCourseManagement";
import { AdminSupabaseConfigurationError, AdminSupabaseRequestError, getAdminCourses } from "@/lib/admin-courses";

export const metadata={title:"Course Management"};
export const dynamic="force-dynamic";
export default async function Admin(){try{const courses=await getAdminCourses();return <><Navbar/><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><AdminCourseManagement courses={courses}/></main><Footer/></>;}catch(error){const detail=error instanceof AdminSupabaseConfigurationError||error instanceof AdminSupabaseRequestError?error.message:"Supabase could not be reached. Check the project URL, SUPABASE_SECRET_KEY and database connection.";console.error("[admin] Course management unavailable",error instanceof Error?error.message:error);return <><Navbar/><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Course management</p><h1 className="display mt-4 text-5xl font-bold">Supabase configuration is incomplete.</h1><p className="mt-5 text-lg leading-relaxed text-slate-600">{detail} No local fallback data can be edited here.</p></main><Footer/></>;}}
