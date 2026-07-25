import GermanCourseList from "@/components/GermanCourseList";
import GermanCourseFaq from "@/components/GermanCourseFaq";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/deutschkurse/a2",locale:"de",title:"A2 Deutschkurs",description:"Deutsch A2 online lernen und sicherer sprechen: Grammatik, Wortschatz und Kommunikation in einer fortlaufenden Geschichte."});
export default function A2() { return <GermanCourseList title="A2 Deutsch" description="Gewinnen Sie Sicherheit durch bedeutungsvolle Gespräche und kontinuierliche Übung." category="A2" slugPrefix="a2" afterContent={<GermanCourseFaq level="a2" />} />; }
