import ConcreteCourseListPage from "@/components/ConcreteCourseListPage";
import { B1B2FaqSection, faqItems } from "@/components/B1B2CourseContent";
import { FaqStructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/german-courses/b1-b2",title:"B1–B2 German Course",description:"Develop fluent, confident German communication for professional and everyday situations in a B1–B2 course."});
export default function B1B2(){return <ConcreteCourseListPage title="B1–B2 German" description="Communicate naturally in more complex professional and everyday situations." category="B1–B2" slugPrefix="b1-b2" afterContent={<><FaqStructuredData items={faqItems}/><B1B2FaqSection/></>}/>}
