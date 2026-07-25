"use server";

import { revalidatePath } from "next/cache";
import { adminCourseRequest, deleteAdminBookingRequest } from "@/lib/admin-courses";

const allowedStatuses = new Set(["contacted", "confirmed", "cancelled"]);
export async function updateBookingRequestStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim(), status = String(formData.get("status") ?? "").trim();
  if (!id || !allowedStatuses.has(status)) throw new Error("Invalid booking request status.");
  await adminCourseRequest(`booking_requests?id=eq.${encodeURIComponent(id)}`, "PATCH", { status, updated_at: new Date().toISOString() });
  revalidatePath("/admin/bookings");
}

export type DeleteBookingRequestResult = { error?: string; success?: string };
const bookingRequestId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function deleteBookingRequest(_previous: DeleteBookingRequestResult, formData: FormData): Promise<DeleteBookingRequestResult> {
  const id = String(formData.get("id") ?? "").trim();
  if (!bookingRequestId.test(id)) return { error: "The booking request could not be deleted." };

  try {
    const deleted = await deleteAdminBookingRequest(id);
    if (!deleted) {
      console.error("[admin] Booking request deletion did not affect exactly one row", { id });
      return { error: "The booking request could not be deleted." };
    }
    revalidatePath("/admin/bookings");
    return { success: "Booking request deleted." };
  } catch (error) {
    console.error("[admin] Booking request deletion failed", error instanceof Error ? error.message : error);
    return { error: "The booking request could not be deleted." };
  }
}
