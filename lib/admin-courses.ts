import "server-only";

export type AdminCourse = { id:string; slug:string; category:string; title_de:string; title_en:string; description_de:string; description_en:string; image_path:string; paypal_checkout_url:string|null; price_cents:number; price_prefix_de:string|null; price_prefix_en:string|null; format_de:string; format_en:string; duration_weeks:number; start_date:string|null; schedule_de:string; schedule_en:string; seats_available:number; visible:boolean; sort_order:number };

export class AdminSupabaseConfigurationError extends Error { constructor(public readonly issues:string[]){super(issues.join(" "));} }
export class AdminSupabaseRequestError extends Error { constructor(public readonly kind:"unreachable"|"authentication"|"missing-table"|"api",message:string){super(message);} }
const placeholderValues=new Set(["your_supabase_secret_key","your_supabase_publishable_key","replace_me","change_me","placeholder"]);
const isPlaceholder=(value:string|undefined)=>{const normalized=value?.trim().toLowerCase();if(!normalized)return true;if(normalized.startsWith("sb_secret_"))return false;return placeholderValues.has(normalized);};
export const getAdminSupabaseDiagnostic=()=>{const values={NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,SUPABASE_SECRET_KEY:process.env.SUPABASE_SECRET_KEY};const required={NEXT_PUBLIC_SUPABASE_URL:values.NEXT_PUBLIC_SUPABASE_URL,SUPABASE_SECRET_KEY:values.SUPABASE_SECRET_KEY};const issues=Object.entries(required).flatMap(([name,value])=>!value?[`Missing required environment variable: ${name}.`]:isPlaceholder(value)?[`Replace the placeholder value for ${name}.`]:[]);const presence=Object.fromEntries(Object.entries(values).map(([name,value])=>[name,{present:Boolean(value),placeholder:isPlaceholder(value)}]));console.info("[admin] Supabase environment check",presence);return {values,issues};};
const getConfig=()=>{const {values,issues}=getAdminSupabaseDiagnostic();if(issues.length)throw new AdminSupabaseConfigurationError(issues);return {url:values.NEXT_PUBLIC_SUPABASE_URL!,key:values.SUPABASE_SECRET_KEY!};};
const headers=(key:string,extra?:HeadersInit)=>({apikey:key,Authorization:`Bearer ${key}`,...extra});
const endpoint=(url:string,path:string)=>`${url.replace(/\/$/,"")}/rest/v1/${path}`;
const requestError=(status:number,body:string)=>{const normalized=body.toLowerCase();if(status===401||status===403)return new AdminSupabaseRequestError("authentication","Supabase authentication failed. Verify SUPABASE_SECRET_KEY and the project URL.");if(status===404||normalized.includes("could not find the table")||normalized.includes("pgrst205")||normalized.includes("42p01"))return new AdminSupabaseRequestError("missing-table","The Supabase courses table is missing or unavailable. Run the courses migration in this Supabase project.");return new AdminSupabaseRequestError("api",`Supabase REST API returned ${status}. Check the server log for the response details.`);};
async function supabaseRequest<T>(path:string,method:"GET"|"POST"|"PATCH"|"DELETE",body?:unknown,returnRepresentation=false):Promise<T|null>{const {url,key}=getConfig();const requestUrl=endpoint(url,path);console.info("[admin] Supabase REST request",{url:requestUrl,method});let response:Response;try{response=await fetch(requestUrl,{method,headers:headers(key,body===undefined?(returnRepresentation?{Prefer:"return=representation"}:undefined):{"Content-Type":"application/json",Prefer:"return=representation"}),body:body===undefined?undefined:JSON.stringify(body),cache:"no-store"});}catch(error){const cause=error instanceof Error&&"cause" in error?error.cause:undefined;const diagnostic={url:requestUrl,method,errorName:error instanceof Error?error.name:typeof error,errorMessage:error instanceof Error?error.message:String(error),errorCause:cause instanceof Error?{name:cause.name,message:cause.message}:cause??null,httpStatus:null,responseBody:null};console.error("[admin] Supabase fetch failed",diagnostic);throw new AdminSupabaseRequestError("unreachable",process.env.NODE_ENV==="development"?`Supabase fetch failed: ${diagnostic.errorName}: ${diagnostic.errorMessage}`:"Supabase URL is invalid or unreachable. Verify NEXT_PUBLIC_SUPABASE_URL and network access.");}const responseBody=await response.text();if(!response.ok){const diagnostic={url:requestUrl,method,httpStatus:response.status,statusText:response.statusText,responseBody};console.error("[admin] Supabase REST error",diagnostic);throw requestError(response.status,responseBody);}if(!responseBody)return null;try{return JSON.parse(responseBody) as T;}catch(error){const diagnostic={url:requestUrl,method,httpStatus:response.status,responseBody,errorName:error instanceof Error?error.name:typeof error,errorMessage:error instanceof Error?error.message:String(error),errorCause:error instanceof Error&&"cause" in error?error.cause:null};console.error("[admin] Supabase returned invalid JSON",diagnostic);throw new AdminSupabaseRequestError("api","Supabase returned an unexpected response. Check the server log for details.");}}

export async function getAdminCourses():Promise<AdminCourse[]>{return (await supabaseRequest<AdminCourse[]>("courses?select=id,slug,category,title_de,title_en,description_de,description_en,image_path,paypal_checkout_url,price_cents,price_prefix_de,price_prefix_en,format_de,format_en,duration_weeks,start_date,schedule_de,schedule_en,seats_available,visible,sort_order&order=sort_order.asc,start_date.asc","GET"))??[];}

export async function getAdminCourse(id:string):Promise<AdminCourse>{const courses=(await supabaseRequest<AdminCourse[]>(`courses?id=eq.${encodeURIComponent(id)}&select=id,slug,category,title_de,title_en,description_de,description_en,image_path,paypal_checkout_url,price_cents,price_prefix_de,price_prefix_en,format_de,format_en,duration_weeks,start_date,schedule_de,schedule_en,seats_available,visible,sort_order`,"GET"))??[];if(!courses[0])throw new Error("Course not found.");return courses[0];}

export async function adminCourseRequest(path:string,method:"GET"|"POST"|"PATCH"|"DELETE",body?:unknown){return supabaseRequest<unknown>(path,method,body);}

/** Deletes only an exact booking-request primary key and returns the row Supabase confirms was removed. */
export async function deleteAdminBookingRequest(id: string): Promise<{ id: string } | null> {
  const deleted = await supabaseRequest<Array<{ id: string }>>(`booking_requests?id=eq.${encodeURIComponent(id)}&select=id`, "DELETE", undefined, true);
  if (!deleted || deleted.length !== 1 || deleted[0].id !== id) return null;
  return deleted[0];
}

export type AdminBookingRequest = {
  id: string; created_at: string; updated_at: string; course_id: string; customer_name: string; customer_email: string;
  customer_phone: string | null; german_level: string | null; message: string | null; payment_method: string; status: string;
  terms_accepted_at: string; privacy_acknowledged_at: string; withdrawal_acknowledged_at: string;
  courses: Pick<AdminCourse, "title_en" | "start_date" | "schedule_en" | "price_cents" | "price_prefix_en"> | null;
};

/** Booking requests are read only through the server secret key; the relation is the course_id foreign key. */
export async function getAdminBookingRequests(): Promise<AdminBookingRequest[]> {
  return (await supabaseRequest<AdminBookingRequest[]>("booking_requests?select=id,created_at,updated_at,course_id,customer_name,customer_email,customer_phone,german_level,message,payment_method,status,terms_accepted_at,privacy_acknowledged_at,withdrawal_acknowledged_at,courses(title_en,start_date,schedule_en,price_cents,price_prefix_en)&order=created_at.desc", "GET")) ?? [];
}
