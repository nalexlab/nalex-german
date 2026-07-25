"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AdminCourse } from "@/lib/admin-courses";
import { saveCourse } from "@/app/admin/actions";

const fallbackImage = "/images/courses/default.jpg";
const empty: Omit<AdminCourse, "id"> = { slug: "", category: "", title_de: "", title_en: "", description_de: "", description_en: "", image_path: fallbackImage, paypal_checkout_url: null, price_cents: 0, price_prefix_de: null, price_prefix_en: null, format_de: "", format_en: "", duration_weeks: 4, start_date: null, schedule_de: "", schedule_en: "", seats_available: 0, visible: true, sort_order: 0 };
const price = (cents: number) => (cents / 100).toFixed(2);
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const inputClass = "rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-cobalt";

export default function AdminCourseForm({ course, imagePaths }: { course?: AdminCourse; imagePaths: string[] }) {
  const router = useRouter();
  const current = course ?? empty;
  const [slug, setSlug] = useState(current.slug);
  const [title, setTitle] = useState(current.title_en);
  const availableImages = current.image_path && !imagePaths.includes(current.image_path) ? [...imagePaths, current.image_path].sort((a, b) => a.localeCompare(b)) : imagePaths;
  const [image, setImage] = useState(current.image_path || fallbackImage);
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();
  const editing = Boolean(course);
  const submit = (formData: FormData) => startTransition(async () => { const result = await saveCourse(formData); if (result.error) { setMessage(result.error); return; } router.push("/admin"); router.refresh(); });

  return <section className="rounded-[2rem] bg-mist p-6 sm:p-10">
    <div className="flex items-center justify-between gap-4"><div><p className="eyebrow">{editing ? "Edit course" : "New course"}</p><h1 className="display mt-3 text-4xl font-bold">Course details</h1></div><button type="button" onClick={() => router.push("/admin")} className="text-sm font-bold">Close</button></div>
    {message && <p role="status" className="mt-6 rounded-xl bg-white p-4 text-sm font-semibold">{message}</p>}
    <form onSubmit={(event) => { event.preventDefault(); submit(new FormData(event.currentTarget)); }} className="mt-8 grid gap-8">
      <input type="hidden" name="id" value={course?.id ?? ""} />
      <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 text-xl font-bold">General</legend>
        <Field label="Category"><input required name="category" defaultValue={current.category} className={inputClass} /></Field>
        <Field label="Slug"><input required name="slug" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} className={inputClass} /></Field><Field label="Price (€)"><input required name="price" type="number" min="0" step="0.01" defaultValue={price(current.price_cents)} className={inputClass} /></Field><Field label="Start date"><input name="start_date" type="date" defaultValue={current.start_date ?? ""} className={inputClass} /></Field><Field label="PayPal Checkout Link" className="sm:col-span-2"><input name="paypal_checkout_url" type="url" defaultValue={current.paypal_checkout_url ?? ""} placeholder="https://www.paypal.com/..." className={inputClass} /></Field>
        <Field label="Duration (weeks)"><input required name="duration_weeks" type="number" min="1" step="1" defaultValue={current.duration_weeks} className={inputClass} /></Field><Field label="Available seats"><input required name="seats_available" type="number" min="0" step="1" defaultValue={current.seats_available} className={inputClass} /></Field><Field label="Display order"><input required name="sort_order" type="number" step="1" defaultValue={current.sort_order} className={inputClass} /></Field><label className="flex items-center gap-3 pt-7 text-sm font-bold"><input name="visible" type="checkbox" defaultChecked={current.visible} /> Visible on website</label>
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 text-xl font-bold">German</legend><Field label="Course title"><input required name="title_de" defaultValue={current.title_de} className={inputClass} /></Field><Field label="Format"><input required name="format_de" defaultValue={current.format_de} className={inputClass} /></Field><Field label="Description" className="sm:col-span-2"><textarea required name="description_de" defaultValue={current.description_de} rows={4} className={`${inputClass} resize-none`} /></Field><Field label="Schedule" className="sm:col-span-2"><input required name="schedule_de" defaultValue={current.schedule_de} className={inputClass} /></Field></fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 text-xl font-bold">English</legend><Field label="Course title"><input required name="title_en" value={title} onChange={(event) => { setTitle(event.target.value); if (!slug) setSlug(slugify(event.target.value)); }} className={inputClass} /></Field><Field label="Format"><input required name="format_en" defaultValue={current.format_en} className={inputClass} /></Field><Field label="Description" className="sm:col-span-2"><textarea required name="description_en" defaultValue={current.description_en} rows={4} className={`${inputClass} resize-none`} /></Field><Field label="Schedule" className="sm:col-span-2"><input required name="schedule_en" defaultValue={current.schedule_en} className={inputClass} /></Field></fieldset>
      <fieldset><legend className="mb-3 text-xl font-bold">Course image</legend><div className="grid gap-5 sm:grid-cols-[1fr_220px]"><Field label="Select an existing image"><select name="image_path" value={image} onChange={(event) => setImage(event.target.value)} className={inputClass}>{availableImages.map((path) => <option key={path} value={path}>{path.split("/").at(-1)}{path === current.image_path && !imagePaths.includes(path) ? " (missing)" : ""}</option>)}</select></Field><img src={image} onError={(event) => { event.currentTarget.src = fallbackImage; }} alt="Selected course" className="aspect-[4/3] w-full rounded-xl border border-slate-200 object-cover" /></div></fieldset>
      <div className="flex flex-wrap gap-3"><button disabled={pending} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">{pending ? "Saving…" : "Save course"}</button><button type="button" onClick={() => router.push("/admin")} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold">Cancel</button></div>
    </form>
  </section>;
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) { return <label className={`grid gap-2 text-sm font-bold ${className}`}><span>{label}</span>{children}</label>; }
