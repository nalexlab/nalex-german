import ConcreteCourseListPage from "@/components/ConcreteCourseListPage";
import { A1FaqSection, faqItems } from "@/components/A1CourseContent";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/german-courses/a1",title:"A1 German Course",description:"Build confidence in an A1 German course with guided speaking, grammar and vocabulary through one ongoing story."});
export default function A1(){return <ConcreteCourseListPage title="A1 German" description="Start speaking German through stories, guided practice and real communication." category="A1" slugPrefix="a1" afterContent={<><FaqStructuredData items={faqItems}/><A1FaqSection/></>}/>}
