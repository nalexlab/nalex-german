export function SiteStructuredData() {
  const data = [
    { "@context": "https://schema.org", "@type": "Organization", name: "NALEX LAB", legalName: "Tatiana Beckmann", url: "https://nalex-german.de", email: "info@nalex-german.de", telephone: "0511 901223702", address: { "@type": "PostalAddress", streetAddress: "Luhnenstraße 7", postalCode: "30559", addressLocality: "Hannover", addressCountry: "DE" } },
    { "@context": "https://schema.org", "@type": "WebSite", name: "NALEX LAB", url: "https://nalex-german.de" },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqStructuredData({ items }: { items: ReadonlyArray<readonly string[]> }) {
  const data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([name, text]) => ({ "@type": "Question", name: name ?? "", acceptedAnswer: { "@type": "Answer", text: text ?? "" } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function CourseStructuredData({ locale, name, description, price, url, workload }: { locale: "en" | "de"; name: string; description: string; price: string; url: string; workload: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: { "@type": "Organization", name: "NALEX LAB", url: "https://nalex-german.de" },
    inLanguage: locale,
    url: `https://nalex-german.de${url}`,
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: workload },
    offers: { "@type": "Offer", price, priceCurrency: "EUR", url: `https://nalex-german.de${url}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
