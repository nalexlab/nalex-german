import GermanCourseList from "@/components/GermanCourseList";
import GermanCourseFaq from "@/components/GermanCourseFaq";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/deutschkurse/b1-b2",locale:"de",title:"B1–B2 Deutschkurs",description:"Deutsch auf B1–B2-Niveau: flüssiger, präziser und sicherer in Beruf und Alltag kommunizieren."});
export default function B1B2() { return <GermanCourseList title="B1–B2 Deutsch" description="Kommunizieren Sie natürlich in anspruchsvolleren beruflichen und alltäglichen Situationen." category="B1–B2" slugPrefix="b1-b2" afterContent={<GermanCourseFaq level="b1b2" />} />; }
