import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/terms",title:"Terms and Conditions",description:"Terms and conditions for NALEX LAB courses."});
export default async function Terms(){const document=await getLegalDocument("terms","en");return <LegalLayout title={document.title}><LegalMarkdown content={document.content}/></LegalLayout>}
