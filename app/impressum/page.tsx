import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/impressum",locale:"de",title:"Impressum",description:"Rechtliche Angaben zu NALEX LAB."});
export default async function Imprint() { const document = await getLegalDocument("imprint", "de"); return <LegalLayout locale="de" title={document.title}><LegalMarkdown content={document.content} variant="imprint" /></LegalLayout>; }
