import Link from "next/link";
import Footer from "./Footer";
import type { Locale } from "@/lib/locale-routes";

export default function LegalLayout({ title, children, locale = "en" }: { title: string; children: React.ReactNode; locale?: Locale }) {
  const de = locale === "de";
  return <><main className="mx-auto max-w-3xl px-6 py-20 font-sans"><Link href={de ? "/de" : "/"} className="text-sm font-bold text-cobalt">← NALEX LAB</Link><p className="eyebrow mt-12">{de ? "Rechtliche Informationen" : "Legal information"}</p><h1 className="display mt-4 text-5xl font-bold">{title}</h1><div className="mt-10 space-y-8 break-words">{children}</div></main><Footer locale={locale} /></>;
}
