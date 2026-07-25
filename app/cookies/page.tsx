import LegalLayout from "@/components/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/cookies", locale: "de", title: "Cookie- & Speicher-Richtlinie", description: "Informationen zu Cookies und Browser-Speicher bei NALEX LAB." });

export default function Cookies() {
  return <LegalLayout locale="de" title="Cookie- & Speicher-Richtlinie">
    <section><h2 className="text-xl font-bold text-ink">Cookies</h2><p>Diese Website setzt derzeit keine Cookies.</p></section>
    <section><h2 className="text-xl font-bold text-ink">Analyse und Werbung</h2><p>NALEX LAB verwendet derzeit keine Analyse- oder Werbetracking-Dienste, Tracking-Pixel, Einbettungen oder Drittanbieter-Skripte. Es wird kein externer Schriftendienst verwendet.</p></section>
    <section><h2 className="text-xl font-bold text-ink">Session Storage bei der Buchung</h2><p>Während des Buchungsvorgangs verwendet die Website Browser-Session-Storage mit dem Schlüssel <strong>nalex-booking</strong>. Dort werden Buchungsformularfelder und der Status der erforderlichen rechtlichen Checkboxen vorübergehend gespeichert, solange die Browser-Sitzung aktiv ist.</p><p>Dieser sitzungsbasierte Speicher wird nicht zum Tracking verwendet.</p></section>
    <section><h2 className="text-xl font-bold text-ink">Von Ihnen geöffnete externe Dienste</h2><p>PayPal und WhatsApp werden erst geöffnet, wenn Sie den jeweiligen Link auswählen. Nach dem Verlassen dieser Website gelten die eigenen Datenschutz- und Speicherregeln dieser externen Anbieter.</p></section>
  </LegalLayout>;
}
