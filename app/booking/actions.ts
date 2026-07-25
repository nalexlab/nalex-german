"use server";

import { revalidatePath } from "next/cache";
import { adminCourseRequest, getAdminCourse } from "@/lib/admin-courses";
import { formatCourseDate, formatCoursePrice } from "@/lib/public-courses";

type BankTransferInput = { courseId: string; firstName: string; lastName: string; email: string; phone?: string; level: string; message?: string; termsAccepted: boolean; privacyAccepted: boolean; withdrawalAccepted: boolean };
export type BankTransferResult = { error?: string; reference?: string; course?: { title: string; startDate: string; price: string }; customerEmail?: string };
const value = (input: string | undefined) => input?.trim() ?? "";

export async function createBankTransferBooking(input: BankTransferInput): Promise<BankTransferResult> {
  const firstName = value(input.firstName), lastName = value(input.lastName), email = value(input.email), courseId = value(input.courseId);
  if (!courseId || !firstName || !lastName || !email || !value(input.level)) return { error: "Please complete all required customer details before submitting your booking request." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Please enter a valid email address." };
  if (!input.termsAccepted || !input.privacyAccepted || !input.withdrawalAccepted) return { error: "Please accept the required legal notices before submitting your booking request." };
  try {
    // The course is always resolved on the server. Browser-provided price and course text are never used.
    const course = await getAdminCourse(courseId);
    if (!course.visible) return { error: "This course is no longer available for booking." };
    const now = new Date().toISOString();
    const created = await adminCourseRequest("booking_requests", "POST", { course_id: course.id, customer_name: `${firstName} ${lastName}`, customer_email: email, customer_phone: value(input.phone) || null, german_level: value(input.level), message: value(input.message) || null, payment_method: "bank_transfer", status: "new", terms_accepted_at: now, privacy_acknowledged_at: now, withdrawal_acknowledged_at: now }) as Array<{ id: string }> | null;
    const request = created?.[0];
    if (!request?.id) return { error: "Your booking request could not be saved. Please try again." };
    revalidatePath("/admin/bookings");
    return { reference: request.id, customerEmail: email, course: { title: course.title_en, startDate: formatCourseDate(course.start_date), price: formatCoursePrice(course.price_cents, course.price_prefix_en) } };
  } catch (error) {
    console.error("[booking] Bank transfer request failed", error instanceof Error ? error.message : error);
    return { error: "Your booking request could not be saved. Please try again or contact us." };
  }
}
