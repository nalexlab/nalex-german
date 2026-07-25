export function SiteStructuredData() {
  const data = [
    { "@context": "https://schema.org", "@type": "Organization", name: "NALEX LAB", url: "https://nalex-german.de" },
    { "@context": "https://schema.org", "@type": "WebSite", name: "NALEX LAB", url: "https://nalex-german.de" },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqStructuredData({ items }: { items: ReadonlyArray<readonly string[]> }) {
  const data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([name, text]) => ({ "@type": "Question", name: name ?? "", acceptedAnswer: { "@type": "Answer", text: text ?? "" } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
