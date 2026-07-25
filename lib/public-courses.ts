import "server-only";

export type PublicCourse = {
  id: string;
  slug: string;
  category: string;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  image_path: string;
  paypal_checkout_url: string | null;
  price_cents: number;
  price_prefix_de: string | null;
  price_prefix_en: string | null;
  format_de: string;
  format_en: string;
  duration_weeks: number;
  start_date: string | null;
  schedule_de: string;
  schedule_en: string;
  seats_available: number;
  visible: boolean;
  sort_order: number;
};

const courseColumns = "id,slug,category,title_de,title_en,description_de,description_en,image_path,paypal_checkout_url,price_cents,price_prefix_de,price_prefix_en,format_de,format_en,duration_weeks,start_date,schedule_de,schedule_en,seats_available,visible,sort_order";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Public course data is unavailable because Supabase is not configured.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

async function requestCourses(query: string): Promise<PublicCourse[]> {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/rest/v1/courses?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Public course request failed with ${response.status}.`);
  }

  return response.json() as Promise<PublicCourse[]>;
}

/** Resolves the concrete course selected by the direct booking URL. */
export async function getCourseBySlug(slug: string): Promise<PublicCourse | null> {
  const requestedSlug = slug.trim();
  const courses = await requestCourses(
    `select=${courseColumns}&slug=eq.${encodeURIComponent(requestedSlug)}&visible=eq.true`,
  );
  const course = courses[0] ?? null;
  console.info("[public-course] slug lookup", {
    requestedSlug,
    returnedId: course?.id ?? null,
    returnedSlug: course?.slug ?? null,
  });
  return course;
}

/** Used by the booking flow, where links deliberately carry the scheduled course UUID. */
export async function getCourseById(id: string): Promise<PublicCourse | null> {
  const courses = await requestCourses(
    `select=${courseColumns}&id=eq.${encodeURIComponent(id)}&visible=eq.true`,
  );
  return courses[0] ?? null;
}

export async function getVisibleCourses(): Promise<PublicCourse[]> {
  return requestCourses(`select=${courseColumns}&visible=eq.true&order=sort_order.asc,start_date.asc`);
}

/** Returns all visible concrete course instances for one course category. */
export async function getCoursesByCategory(category: string): Promise<PublicCourse[]> {
  return requestCourses(
    `select=${courseColumns}&category=eq.${encodeURIComponent(category)}&visible=eq.true&order=sort_order.asc,start_date.asc`,
  );
}

/** Returns all visible scheduled Reading Club instances by their reserved slug prefix. */
export async function getCoursesBySlugPrefix(prefix: string): Promise<PublicCourse[]> {
  return requestCourses(
    `select=${courseColumns}&slug=like.${encodeURIComponent(`${prefix}%`)}&visible=eq.true&order=sort_order.asc,start_date.asc`,
  );
}

/** Returns visible standard German course instances for one reserved slug prefix and learner level. */
export async function getCoursesBySlugPrefixAndCategory(prefix: string, category: string): Promise<PublicCourse[]> {
  return requestCourses(
    `select=${courseColumns}&slug=like.${encodeURIComponent(`${prefix}%`)}&category=eq.${encodeURIComponent(category)}&visible=eq.true&order=sort_order.asc,start_date.asc`,
  );
}

export const formatCourseDate = (date: string | null, locale: "en" | "de-DE" = "en") => date
  ? new Intl.DateTimeFormat(locale === "de-DE" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))
  : "On request";

export const formatCoursePrice = (cents: number, prefix: string | null) =>
  `${prefix ? `${prefix} ` : ""}EUR ${(cents / 100).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`;
