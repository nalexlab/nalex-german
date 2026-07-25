import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/withdrawal",title:"Right of Withdrawal",description:"Information about the right of withdrawal for NALEX LAB courses."});
export default async function Withdrawal(){const document=await getLegalDocument("withdrawal","en");return <LegalLayout title={document.title}><LegalMarkdown content={document.content}/></LegalLayout>}
