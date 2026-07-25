import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GermanWithdrawalForm from "@/components/GermanWithdrawalForm";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/de/vertrag-widerrufen",locale:"de",title:"Vertrag widerrufen",description:"Elektronischen Widerruf übermitteln.",noindex:true});
export default function VertragWiderrufen(){return <><Navbar locale="de"/><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Widerruf</p><h1 className="display mt-4 text-5xl font-bold">Vertrag widerrufen</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Nutzen Sie dieses Formular, um den Vertrag zu identifizieren, den Sie widerrufen möchten.</p><div className="mt-10"><GermanWithdrawalForm/></div></main><Footer locale="de"/></>}
