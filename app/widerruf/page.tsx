import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/widerruf",locale:"de",title:"Widerrufsbelehrung",description:"Informationen zum Widerrufsrecht bei NALEX LAB."});
export default async function Widerruf() { const document = await getLegalDocument("withdrawal", "de"); return <LegalLayout locale="de" title={document.title}><LegalMarkdown content={document.content} /></LegalLayout>; }
