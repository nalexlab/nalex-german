import ConcreteCourseListPage from "@/components/ConcreteCourseListPage";
import { A2FaqSection, faqItems } from "@/components/A2CourseContent";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/german-courses/a2",title:"A2 German Course",description:"Build confidence in German with meaningful conversations, continuous practice and one interactive story."});
export default function A2(){return <ConcreteCourseListPage title="A2 German" description="Build confidence through meaningful conversations and continuous practice." category="A2" slugPrefix="a2" afterContent={<><FaqStructuredData items={faqItems}/><A2FaqSection/></>}/>}
