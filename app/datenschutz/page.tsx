import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/datenschutz",locale:"de",title:"Datenschutzerklärung",description:"Informationen zum Datenschutz bei NALEX LAB."});
export default async function Privacy() { const document = await getLegalDocument("privacy", "de"); return <LegalLayout locale="de" title={document.title}><LegalMarkdown content={document.content} /></LegalLayout>; }
