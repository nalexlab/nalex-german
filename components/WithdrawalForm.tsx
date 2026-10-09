"use client";

import { useState } from "react";
import { submitWithdrawal } from "@/app/withdraw-from-contract/actions";

const actionTimeoutMs = 15_000;

export default function WithdrawalForm(){
  const [error,setError]=useState<string>();
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const submit=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(submitting)return;
    const data=new FormData(event.currentTarget);
    setError(undefined);
    setSubmitting(true);
    try{
      const result=await Promise.race([
        submitWithdrawal({fullName:String(data.get("fullName")??""),email:String(data.get("email")??""),bookingReference:String(data.get("bookingReference")??""),message:String(data.get("message")??""),website:String(data.get("website")??"")}),
        new Promise<never>((_,reject)=>window.setTimeout(()=>reject(new Error("Withdrawal action timed out.")),actionTimeoutMs)),
      ]);
      if(result.error){setError(result.error);return;}
      if(result.success){setSubmitted(true);return;}
      setError("Your withdrawal could not be submitted. Please email us directly at info@nalex-german.de.");
    }catch{setError("Your withdrawal could not be submitted. Please email us directly at info@nalex-german.de.");}
    finally{setSubmitting(false);}
  };
  if(submitted)return <div className="rounded-3xl bg-lime p-8"><p className="eyebrow text-ink">Withdrawal received</p><h1 className="display mt-4 text-4xl font-bold">Withdrawal received</h1><p className="mt-4 max-w-2xl text-slate-700">Your withdrawal has been received. A confirmation has been sent to your email address.</p></div>;
  return <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-ink p-6 text-white sm:p-8"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/><input required name="fullName" placeholder="Full name" className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400"/><input required name="email" type="email" placeholder="Email address" className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400"/><input required name="bookingReference" placeholder="Booking number or course" className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400"/><textarea name="message" rows={4} maxLength={5000} placeholder="Optional message" className="resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-sm placeholder:text-slate-400"/>{error&&<p role="alert" className="rounded-xl bg-white/10 p-3 text-sm text-lime">{error}</p>}<button disabled={submitting} className="rounded-xl bg-lime p-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-60">{submitting?"Submitting withdrawal…":"Confirm withdrawal"}</button><p className="text-xs leading-relaxed text-slate-400">If the form cannot be submitted, you may also send your withdrawal directly to <a className="font-semibold text-lime" href="mailto:info@nalex-german.de">info@nalex-german.de</a>.</p></form>;
}
