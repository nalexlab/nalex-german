import LegalLayout from "@/components/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/cookie-policy", title: "Cookie & Storage Policy", description: "Information about cookies and browser storage used by NALEX LAB." });

export default function CookiePolicy() {
  return <LegalLayout title="Cookie & Storage Policy">
    <section><h2 className="text-xl font-bold text-ink">Cookies</h2><p>This website currently sets no cookies.</p></section>
    <section><h2 className="text-xl font-bold text-ink">Analytics and advertising</h2><p>NALEX LAB currently does not use analytics, advertising tracking, tracking pixels, embeds or third-party scripts. No external font service is used.</p></section>
    <section><h2 className="text-xl font-bold text-ink">Booking session storage</h2><p>During the booking process, the website uses browser session storage with the key <strong>nalex-booking</strong>. It temporarily retains booking form fields and the state of the required legal checkboxes while the browser session is active.</p><p>This session-based storage is not used for tracking.</p></section>
    <section><h2 className="text-xl font-bold text-ink">External services opened by you</h2><p>PayPal and WhatsApp are opened only after you select the relevant link. After leaving this website, those external providers apply their own privacy and storage rules.</p></section>
  </LegalLayout>;
}
