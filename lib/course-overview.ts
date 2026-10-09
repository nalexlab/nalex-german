import { formatCourseDate, formatCoursePriceForSlug, getVisibleCourses } from "@/lib/public-courses";
import type { Locale } from "@/lib/locale-routes";

export type CourseOverview = { id:string; slug:string; category:string; title:string; description:string; format:string; duration:string; startDate:string; schedule:string; price:string; seats:number; imagePath:string };

export async function getCourseOverview(locale: Locale = "en"): Promise<{ courses: CourseOverview[] }> {
  const courses = (await getVisibleCourses()).filter((course) => ["a2", "b1-b2", "technical-german"].some((prefix) => course.slug.startsWith(prefix)));
  const de = locale === "de";
  return {
    courses: courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      category: course.category,
      title: de ? course.title_de : course.title_en,
      description: de ? course.description_de : course.description_en,
      format: de ? course.format_de : course.format_en,
      duration: de ? `${course.duration_weeks} Wochen` : `${course.duration_weeks} weeks`,
      startDate: formatCourseDate(course.start_date, de ? "de-DE" : "en"),
      schedule: de ? course.schedule_de : course.schedule_en,
      price: formatCoursePriceForSlug(course.slug, course.price_cents, de ? course.price_prefix_de : course.price_prefix_en, de ? "de" : "en"),
      seats: course.seats_available,
      imagePath: course.image_path,
    })),
  };
}
