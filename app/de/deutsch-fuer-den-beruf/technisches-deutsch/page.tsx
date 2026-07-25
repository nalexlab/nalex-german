import GermanCourseList from "@/components/GermanCourseList";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/deutsch-fuer-den-beruf/technisches-deutsch",locale:"de",title:"Technisches Deutsch",description:"Technisches Deutsch für Projekte, Fachgespräche, Dokumentation und klare Zusammenarbeit."});
export default function TechnischesDeutsch(){return <GermanCourseList title="Technisches Deutsch" description="Kommunizieren Sie klar in technischen Projekten, Meetings und Dokumentationen." slugPrefix="technical-german"/>}
