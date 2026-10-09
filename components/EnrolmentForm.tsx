"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale-routes";

type BookingCourse = { id: string; title: string; startDate: string; inclusions: string[] };

export default function EnrolmentForm({ course, locale = "en" }: { course: BookingCourse; locale?: Locale }) {
  const router = useRouter();
  const de = locale === "de";
  const paymentPath = de ? "/de/buchung/zahlung" : "/booking/payment";
  const termsPath = de ? "/agb" : "/terms";
  const privacyPath = de ? "/datenschutz" : "/privacy-policy";
  const withdrawalPath = de ? "/widerruf" : "/withdrawal";

  return <form onSubmit={(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sessionStorage.setItem("nalex-booking", JSON.stringify({ firstName: data.get("firstName"), lastName: data.get("lastName"), email: data.get("email"), phone: data.get("phone"), level: data.get("level"), message: data.get("message"), termsAccepted: data.get("termsAccepted") === "on", privacyAccepted: data.get("privacyAccepted") === "on", withdrawalAccepted: data.get("withdrawalAccepted") === "on" }));
    router.push(`${paymentPath}?course=${encodeURIComponent(course.id)}`);
  }} className="grid gap-4 rounded-3xl bg-ink p-6 text-white sm:p-8">
    <div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-slate-400">{de ? "Ausgewählter Kurs" : "Selected course"}</p><p className="mt-1 font-bold">{course.title} · {course.startDate}</p>{course.inclusions.length>0&&<p className="mt-2 text-sm text-slate-300">{course.inclusions.map((item,index)=><span key={item} className={course.inclusions.length===2?"font-bold":undefined}>{index>0?" · ":""}{item}</span>)}</p>}</div>
    <div className="grid gap-4 sm:grid-cols-2"><input required name="firstName" placeholder={de ? "Vorname" : "First name"} className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400" /><input required name="lastName" placeholder={de ? "Nachname" : "Last name"} className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400" /></div>
    <input required name="email" type="email" placeholder={de ? "E-Mail-Adresse" : "Email address"} className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400" /><input name="phone" type="tel" placeholder={de ? "Telefonnummer (optional)" : "Phone number (optional)"} className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400" />
    <select required name="level" defaultValue="" className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm text-white"><option value="" disabled className="text-ink">{de ? "Aktuelles Deutschniveau" : "Current German level"}</option>{["A1", "A2", "B1", "B2", "C1", de ? "Noch nicht sicher" : "Not sure yet"].map((item) => <option key={item} className="text-ink">{item}</option>)}</select>
    <textarea name="message" rows={3} placeholder={de ? "Nachricht (optional)" : "Message (optional)"} className="resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400" />
    <label className="flex gap-2 text-xs text-slate-300"><input required name="termsAccepted" type="checkbox" />{de ? <>Ich akzeptiere die <Link href={termsPath} className="font-semibold text-lime">Allgemeinen Geschäftsbedingungen</Link>.</> : <>I accept the <Link href={termsPath} className="font-semibold text-lime">Terms and Conditions</Link>.</>}</label>
    <label className="flex gap-2 text-xs text-slate-300"><input required name="privacyAccepted" type="checkbox" />{de ? <>Ich habe die <Link href={privacyPath} className="font-semibold text-lime">Datenschutzerklärung</Link> gelesen.</> : <>I have read the <Link href={privacyPath} className="font-semibold text-lime">Privacy Policy</Link>.</>}</label>
    <label className="flex gap-2 text-xs text-slate-300"><input required name="withdrawalAccepted" type="checkbox" />{de ? <>Ich habe die <Link href={withdrawalPath} className="font-semibold text-lime">Widerrufsbelehrung</Link> gelesen.</> : <>I have read the <Link href={withdrawalPath} className="font-semibold text-lime">Right of Withdrawal</Link>.</>}</label>
    <button className="rounded-xl bg-lime p-3 text-sm font-bold text-ink">{de ? "Weiter zur Zahlung" : "Continue to Payment"}</button>
  </form>;
}
