import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AdminCourseForm from "@/components/AdminCourseForm";
import { getAdminCourse } from "@/lib/admin-courses";
import { getCourseImagePaths } from "@/lib/course-images";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Course" };

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [course, imagePaths] = await Promise.all([getAdminCourse(id), getCourseImagePaths()]);
  return <><Navbar /><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><AdminCourseForm course={course} imagePaths={imagePaths} /></main><Footer /></>;
}
