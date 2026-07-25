import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({path:"/imprint",title:"Imprint",description:"Legal information for NALEX LAB."});

export default async function Imprint(){const document=await getLegalDocument("imprint","en");return <LegalLayout title={document.title}><LegalMarkdown content={document.content} variant="imprint"/></LegalLayout>}
