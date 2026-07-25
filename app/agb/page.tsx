import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/agb",locale:"de",title:"Allgemeine Geschäftsbedingungen",description:"Allgemeine Geschäftsbedingungen für Kurse von NALEX LAB."});
export default async function Agb() { const document = await getLegalDocument("terms", "de"); return <LegalLayout locale="de" title={document.title}><LegalMarkdown content={document.content} /></LegalLayout>; }
