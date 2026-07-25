import LegalLayout from "@/components/LegalLayout";
import LegalMarkdown from "@/components/LegalMarkdown";
import { getLegalDocument } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/privacy-policy",title:"Privacy Policy",description:"Privacy information for NALEX LAB."});
export default async function PrivacyPolicy(){const document=await getLegalDocument("privacy","en");return <LegalLayout title={document.title}><LegalMarkdown content={document.content} variant="privacy"/></LegalLayout>}
