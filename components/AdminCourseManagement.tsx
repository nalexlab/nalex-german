"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminCourse } from "@/lib/admin-courses";
import { deleteCourse, duplicateCourse, toggleCourseVisibility } from "@/app/admin/actions";

const fallbackImage = "/images/courses/default.jpg";
const price = (cents: number) => (cents / 100).toFixed(2);
type Result = { error?: string; success?: string };

export default function AdminCourseManagement({ courses }: { courses: AdminCourse[] }) {
  const router = useRouter();
  const [ascending, setAscending] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>();
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const mutationInFlight = useRef(false);
  const ordered = useMemo(() => [...courses].sort((a, b) => ascending === null ? a.title_en.localeCompare(b.title_en) : ascending ? a.sort_order - b.sort_order : b.sort_order - a.sort_order), [courses, ascending]);

  const run = (action: (data: FormData) => Promise<Result>, data: FormData) => {
    if (mutationInFlight.current) return;
    mutationInFlight.current = true;
    startTransition(async () => {
      try {
        const result = await action(data);
        setMessage(result.error ?? result.success);
        if (!result.error) {
          router.refresh();
        }
      } finally {
        mutationInFlight.current = false;
      }
    });
  };

  const actionData = (id: string, visible?: boolean) => {
    const data = new FormData();
    data.set("id", id);
    if (visible !== undefined) data.set("visible", String(visible));
    return data;
  };

  return <>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">Course management</p><h1 className="display mt-4 text-5xl font-bold">Courses</h1><p className="mt-4 text-slate-600">Manage the courses shown on the public website.</p></div>
      <div className="flex flex-wrap gap-3"><Link href="/admin/bookings" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold">Booking requests</Link><Link href="/admin/courses/new" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Add course</Link></div>
    </div>
    {message && <p role="status" className="mt-6 rounded-xl bg-mist p-4 text-sm font-semibold">{message}</p>}
    <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wider text-slate-500"><tr>
          <th className="p-4">Image</th><th className="p-4">Course title</th><th className="p-4">Category</th><th className="p-4">Start date</th><th className="p-4">Price</th><th className="p-4">Available seats</th><th className="p-4">Visible</th>
          <th className="p-4"><button type="button" onClick={() => setAscending(!ascending)} className="font-bold">Sort order {ascending ? "↑" : "↓"}</button></th><th className="p-4">Actions</th>
        </tr></thead>
        <tbody>{ordered.map((course) => <tr key={course.id} className="border-t border-slate-100">
          <td className="p-4"><img src={course.image_path || fallbackImage} onError={(event) => { event.currentTarget.src = fallbackImage; }} alt="" className="h-12 w-16 rounded-lg border border-slate-200 object-cover" /></td>
          <td className="p-4 font-bold">{course.title_en}</td><td className="p-4">{course.category}</td><td className="p-4">{course.start_date ?? "On request"}</td><td className="p-4">€ {price(course.price_cents)}</td><td className="p-4">{course.seats_available}</td><td className="p-4">{course.visible ? "Yes" : "No"}</td><td className="p-4">{course.sort_order}</td>
          <td className="p-4"><div className="flex gap-3 font-bold text-cobalt">
            <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
            <button type="button" disabled={pending} onClick={() => run(duplicateCourse, actionData(course.id))}>Duplicate</button>
            <button type="button" disabled={pending} onClick={() => run(toggleCourseVisibility, actionData(course.id, course.visible))}>{course.visible ? "Hide" : "Show"}</button>
            {deleteCandidate === course.id ? <><button type="button" disabled={pending} onClick={() => { run(deleteCourse, actionData(course.id)); setDeleteCandidate(null); }} className="text-red-600">Confirm delete</button><button type="button" disabled={pending} onClick={() => setDeleteCandidate(null)}>Cancel</button></> : <button type="button" disabled={pending} onClick={() => setDeleteCandidate(course.id)} className="text-red-600">Delete</button>}
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>
  </>;
}
