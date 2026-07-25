import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AdminCourseForm from "@/components/AdminCourseForm";
import { getCourseImagePaths } from "@/lib/course-images";

export const metadata = { title: "Add Course" };

export default async function NewCoursePage() {
  const imagePaths = await getCourseImagePaths();
  return <><Navbar /><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><AdminCourseForm imagePaths={imagePaths} /></main><Footer /></>;
}
