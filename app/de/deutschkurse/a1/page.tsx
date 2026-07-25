import GermanCourseList from "@/components/GermanCourseList";
import GermanCourseFaq from "@/components/GermanCourseFaq";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/deutschkurse/a1",locale:"de",title:"A1 Deutschkurs",description:"Deutsch A1 online lernen: angeleitetes Sprechen, Grammatik und Wortschatz in einer fortlaufenden Geschichte."});
export default function A1() { return <GermanCourseList title="A1 Deutsch" description="Beginnen Sie, durch Geschichten, angeleitete Übungen und echte Kommunikation Deutsch zu sprechen." category="A1" slugPrefix="a1" afterContent={<GermanCourseFaq level="a1" />} />; }
