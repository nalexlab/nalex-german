import type { AdminBookingRequest } from "@/lib/admin-courses";
import { updateBookingRequestStatus } from "@/app/admin/booking-actions";
import { formatCourseDate, formatCoursePrice } from "@/lib/public-courses";
import AdminBookingDeleteButton from "./AdminBookingDeleteButton";

const receivedAt = (value: string) => new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Berlin" }).format(new Date(value));
const actionLabel: Record<string, string> = { contacted: "Mark as contacted", confirmed: "Mark as confirmed", cancelled: "Mark as cancelled" };

export default function AdminBookingRequests({ requests }: { requests: AdminBookingRequest[] }) {
  return <>
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><p className="eyebrow">Booking requests</p><h1 className="display mt-4 text-5xl font-bold">Bookings</h1><p className="mt-4 text-slate-600">Bank-transfer booking requests received from the checkout form.</p></div>
      <a href="/admin/bookings/export" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Export CSV</a>
    </div>
    <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[1280px] w-full text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-4">Status</th><th className="p-4">Received</th><th className="p-4">Customer</th><th className="p-4">German level</th><th className="p-4">Payment</th><th className="p-4">Course</th><th className="p-4">Message</th><th className="p-4">Actions</th></tr></thead>
        <tbody>{requests.map((request) => {
          const course = request.courses;
          return <tr key={request.id} className="border-t border-slate-100 align-top">
            <td className="p-4 font-bold capitalize">{request.status}</td><td className="p-4 whitespace-nowrap">{receivedAt(request.created_at)}</td>
            <td className="p-4"><p className="font-bold">{request.customer_name}</p><p className="mt-1 text-slate-600">{request.customer_email}</p>{request.customer_phone && <p className="mt-1 text-slate-600">{request.customer_phone}</p>}</td>
            <td className="p-4">{request.german_level || "—"}</td><td className="p-4">{request.payment_method}</td>
            <td className="p-4">{course ? <><p className="font-bold">{course.title_en}</p><p className="mt-1 text-slate-600">{formatCourseDate(course.start_date)}</p><p className="mt-1 text-slate-600">{course.schedule_en}</p><p className="mt-1 font-semibold">{formatCoursePrice(course.price_cents, course.price_prefix_en)}</p></> : <span className="text-slate-500">Course unavailable</span>}</td>
            <td className="max-w-xs whitespace-pre-wrap p-4 text-slate-600">{request.message || "—"}</td>
            <td className="p-4"><div className="flex flex-col items-start gap-2 font-bold text-cobalt">{Object.entries(actionLabel).map(([status, label]) => <form key={status} action={updateBookingRequestStatus}><input type="hidden" name="id" value={request.id}/><input type="hidden" name="status" value={status}/><button type="submit" disabled={request.status === status}>{label}</button></form>)}<AdminBookingDeleteButton id={request.id} customerName={request.customer_name} courseTitle={course?.title_en ?? "Course unavailable"} receivedAt={receivedAt(request.created_at)} /></div></td>
          </tr>;
        })}</tbody>
      </table>
      {!requests.length && <p className="p-8 text-sm text-slate-600">No booking requests yet.</p>}
    </div>
  </>;
}
