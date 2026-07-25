import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WithdrawalForm from "@/components/WithdrawalForm";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({path:"/withdraw-from-contract",title:"Withdraw from Contract",description:"Submit an electronic withdrawal request.",noindex:true});

export default function WithdrawFromContract(){return <><Navbar/><main className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">Withdrawal</p><h1 className="display mt-4 text-5xl font-bold">Withdraw from contract</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Use this form to identify the contract you wish to withdraw from.</p><div className="mt-10"><WithdrawalForm/></div></main><Footer/></>;}
