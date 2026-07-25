import { ChevronDown } from "lucide-react";

const faqs = [
  ["Why should I join instead of reading the book on my own?", "Reading alone helps you understand the story. The Reading Club helps you actively use the language. Every chapter includes guided discussions, vocabulary work and grammar practice. During the live sessions, you discuss the story, clarify difficult passages and practise speaking German naturally."],
  ["Do I need to buy the book?", "The selected book will always be announced before the club starts. If required, participants purchase their own copy. Additional worksheets and discussion materials are provided during the course."],
  ["Will we study grammar?", "Yes. The A1–A2 and B1–B2 Reading Clubs include structured grammar exercises connected directly to the story. The C1 Reading Club focuses more strongly on authentic language, vocabulary, style and natural communication."],
  ["Are audio files included?", "Audio recordings are available whenever they are included with the selected learner book."],
  ["Which Reading Club should I choose?", "Choose the club that matches your current German level. A1–A2: learner-friendly stories with vocabulary support, audio recordings and grammar exercises. B1–B2: longer stories, more vocabulary and more discussion. C1: authentic German literature and advanced discussions."],
];

export default function ReadingClubFaqSection(){return <section className="mx-auto max-w-4xl px-5 py-24"><p className="eyebrow">Frequently asked questions</p><h2 className="display mt-4 text-4xl font-bold">Good questions, clear answers.</h2><div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">{faqs.map(([question,answer])=><details key={question} className="group py-5"><summary className="flex cursor-pointer items-center justify-between gap-4 font-bold">{question}<ChevronDown className="transition group-open:rotate-180" size={19}/></summary><p className="max-w-2xl pt-3 text-sm leading-relaxed text-slate-600">{answer}</p></details>)}</div></section>}
