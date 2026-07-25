"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteBookingRequest, type DeleteBookingRequestResult } from "@/app/admin/booking-actions";

const initialState: DeleteBookingRequestResult = {};

export default function AdminBookingDeleteButton({ id, customerName, courseTitle, receivedAt }: { id: string; customerName: string; courseTitle: string; receivedAt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [state, formAction, pending] = useActionState(deleteBookingRequest, initialState);

  useEffect(() => { if (state.success) dialog.current?.close(); }, [state.success]);

  return <><button type="button" onClick={() => dialog.current?.showModal()}>Delete</button><dialog ref={dialog} aria-labelledby={`delete-booking-${id}`} className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 p-0 text-ink shadow-float backdrop:bg-ink/50"><form action={formAction} className="p-6"><input type="hidden" name="id" value={id}/><h2 id={`delete-booking-${id}`} className="display text-2xl font-bold">Delete booking request?</h2><p className="mt-4 text-sm leading-relaxed text-slate-600">Delete this booking request permanently? This action cannot be undone.</p><p className="mt-4 rounded-xl bg-mist p-3 text-sm text-slate-700">{customerName} · {courseTitle} · {receivedAt}</p>{state.error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{state.error}</p>}<div className="mt-6 flex flex-wrap justify-end gap-3"><button type="button" onClick={() => dialog.current?.close()} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold">Cancel</button><button type="submit" disabled={pending} className="rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{pending ? "Deleting…" : "Delete permanently"}</button></div></form></dialog>{state.success && <p role="status" className="mt-2 text-sm font-semibold text-cobalt">{state.success}</p>}</>;
}
