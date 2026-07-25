"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/lib/locale-routes";

const whatsappUrl = (locale: Locale) => `https://wa.me/4915209250609?text=${encodeURIComponent(locale === "de" ? "Hallo NALEX LAB, ich interessiere mich für Ihre Deutschkurse und hätte gern weitere Informationen." : "Hello NALEX LAB, I am interested in your German courses and would like more information.")}`;

export default function ContactForm({ showDirectContactOptions = true, locale }: { showDirectContactOptions?: boolean; locale?: Locale }) {
  const [notice, setNotice] = useState<string>();
  const pathname = usePathname();
  const { lang } = useLanguage();
  const activeLocale: Locale = locale ?? (pathname.startsWith("/de") ? "de" : lang);
  const de = activeLocale === "de";
  const t = de ? { title: "Sagen Sie uns, wohin Sie möchten.", sub: "Wir antworten innerhalb von zwei Werktagen.", name: "Ihr Name", email: "E-Mail-Adresse", message: "Wobei können wir Ihnen helfen?", send: "Anfrage senden" } : { title: "Tell us where you want to go.", sub: "We will reply within two working days.", name: "Your name", email: "Work email", message: "What can we help with?", send: "Send enquiry" };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim(); const email = String(data.get("email") ?? "").trim(); const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`);
    let emailApplicationOpened = false;
    const markEmailApplicationOpened = () => { emailApplicationOpened = true; };
    window.addEventListener("blur", markEmailApplicationOpened, { once: true });
    window.location.assign(`mailto:info@nalex-german.de?subject=${subject}&body=${body}`);
    setNotice(de ? "Ihre E-Mail-Anwendung wurde geöffnet. Bitte senden Sie die vorbereitete Nachricht, um Ihre Anfrage abzuschließen." : "Your email application has been opened. Please send the prepared message to complete your enquiry.");
    window.setTimeout(() => { window.removeEventListener("blur", markEmailApplicationOpened); if (!emailApplicationOpened && document.hasFocus()) setNotice(de ? "Bitte schreiben Sie uns direkt an info@nalex-german.de." : "Please email us directly at info@nalex-german.de."); }, 1500);
  };
  return <form onSubmit={submit} className="rounded-3xl bg-ink p-6 text-white sm:p-9"><h3 className="display text-3xl font-bold">{t.title}</h3><p className="mt-2 text-sm text-slate-400">{t.sub}</p>{notice && <p className="mt-8 rounded-xl bg-white/10 p-4 text-lime">{notice}</p>}<div className="mt-7 space-y-3"><input required name="name" placeholder={t.name} className="w-full rounded-xl border border-white/15 bg-white/10 p-3 text-sm outline-none placeholder:text-slate-400 focus:border-lime" /><input required name="email" type="email" placeholder={t.email} className="w-full rounded-xl border border-white/15 bg-white/10 p-3 text-sm outline-none placeholder:text-slate-400 focus:border-lime" /><textarea required name="message" rows={3} placeholder={t.message} className="w-full resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-sm outline-none placeholder:text-slate-400 focus:border-lime" /><label className="flex gap-2 text-xs text-slate-400"><input required name="privacy" type="checkbox" className="mt-0.5" />{de ? "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu." : "I consent to my data being processed according to the Privacy Policy."}</label><button className="w-full rounded-xl bg-lime p-3 text-sm font-bold text-ink">{t.send}</button>{showDirectContactOptions && <div className="space-y-3 border-t border-white/15 pt-5 text-sm"><p className="text-slate-300">{de ? "Möchten Sie uns lieber direkt kontaktieren?" : "Prefer to contact us directly?"}</p><a href="mailto:info@nalex-german.de" className="block font-bold text-lime">{de ? "Schreiben Sie uns an info@nalex-german.de" : "Email us at info@nalex-german.de"}</a><a href={whatsappUrl(activeLocale)} target="_blank" rel="noopener noreferrer" className="block font-bold text-lime">{de ? "Über WhatsApp kontaktieren" : "Contact us on WhatsApp"}</a></div>}</div></form>;
}
