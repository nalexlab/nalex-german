import { getAdminBookingRequests } from "@/lib/admin-courses";
import { formatCourseDate, formatCoursePrice } from "@/lib/public-courses";

export const dynamic = "force-dynamic";

const escapeCsv = (value: string | null | undefined) => `"${(value ?? "").replace(/"/g, '""')}"`;
const receivedAt = (value: string) => new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Berlin" }).format(new Date(value));

export async function GET() {
  const requests = await getAdminBookingRequests();
  const header = ["Status", "Received at", "Customer name", "Customer email", "German level", "Payment method", "Course title", "Course start date", "Course schedule", "Course price", "Customer message"];
  const rows = requests.map((request) => {
    const course = request.courses;
    return [request.status, receivedAt(request.created_at), request.customer_name, request.customer_email, request.german_level, request.payment_method, course?.title_en, course ? formatCourseDate(course.start_date) : "", course?.schedule_en, course ? formatCoursePrice(course.price_cents, course.price_prefix_en) : "", request.message];
  });
  const csv = `\uFEFF${[header, ...rows].map((row) => row.map(escapeCsv).join(";")).join("\r\n")}\r\n`;
  const filename = `nalex-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "no-store" } });
}
