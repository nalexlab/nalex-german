create extension if not exists pgcrypto;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title_de text not null,
  title_en text not null,
  description_de text not null,
  description_en text not null,
  image_path text not null,
  price_cents integer not null,
  price_prefix_de text,
  price_prefix_en text,
  format_de text not null,
  format_en text not null,
  duration_weeks integer not null,
  start_date date,
  schedule_de text not null,
  schedule_en text not null,
  seats_available integer not null,
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create or replace function public.set_courses_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at before update on public.courses for each row execute procedure public.set_courses_updated_at();

alter table public.courses enable row level security;
drop policy if exists "Visible courses are public" on public.courses;
create policy "Visible courses are public" on public.courses for select using (visible = true);

insert into public.courses (
  slug, category, title_de, title_en, description_de, description_en, image_path,
  price_cents, price_prefix_de, price_prefix_en, format_de, format_en, duration_weeks,
  start_date, schedule_de, schedule_en, seats_available, visible, sort_order
) values
  ('a1-2026-09-16', 'A1', 'A1 Deutschkurs', 'A1 German Course', 'Beginne vom ersten Unterricht an zu sprechen – mit einer fortlaufenden Geschichte.', 'Start speaking from your first lesson with an ongoing story.', '/images/courses/a1.jpg', 24900, null, null, 'Live online', 'Live online', 4, '2026-09-16', 'Dienstags & donnerstags · 18:30–20:00', 'Tuesdays & Thursdays · 18:30–20:00', 6, true, 10),
  ('a2-2026-09-23', 'A2', 'A2 Deutschkurs', 'A2 German Course', 'Stärke dein Selbstvertrauen durch bedeutungsvolle Gespräche jede Woche.', 'Build confidence through meaningful conversations each week.', '/images/courses/a2.jpg', 26900, null, null, 'Live online', 'Live online', 4, '2026-09-23', 'Dienstags & donnerstags · 18:30–20:00', 'Tuesdays & Thursdays · 18:30–20:00', 4, true, 20),
  ('b1-b2-2026-09-30', 'B1–B2', 'B1–B2 Deutschkurs', 'B1–B2 German Course', 'Kommuniziere natürlich in zunehmend komplexen Situationen des Alltags.', 'Communicate naturally in increasingly complex real-life situations.', '/images/courses/b1-b2.jpg', 28900, null, null, 'Live online', 'Live online', 4, '2026-09-30', 'Montags & mittwochs · 18:30–20:00', 'Mondays & Wednesdays · 18:30–20:00', 3, true, 30),
  ('business-german-on-request', 'B1–C1', 'Business Deutsch', 'Business German', 'Deutsch für Meetings, Präsentationen, Verhandlungen und Kundenkommunikation.', 'German for meetings, presentations, negotiations and customer communication.', '/images/courses/business.jpg', 34900, 'Ab', 'From', 'Online oder vor Ort', 'Online or onsite', 6, null, 'Nach Vereinbarung', 'To be agreed', 8, true, 40),
  ('technical-german-on-request', 'B1–C1', 'Technisches Deutsch', 'Technical German', 'Deutsch für Ingenieurprojekte, technische Meetings und Dokumentation.', 'German for engineering projects, technical meetings and documentation.', '/images/courses/technical.jpg', 34900, 'Ab', 'From', 'Online oder vor Ort', 'Online or onsite', 6, null, 'Nach Vereinbarung', 'To be agreed', 8, true, 50),
  ('reading-club-2026-10-08', 'B1+', 'Leseklub', 'Reading Club', 'Lest gemeinsam ein Buch und macht daraus bedeutungsvolle Gespräche auf Deutsch.', 'Read one book together and turn it into meaningful German conversations.', '/images/courses/reading-club.jpg', 12900, null, null, 'Live online', 'Live online', 6, '2026-10-08', 'Donnerstags · 19:00–20:30', 'Thursdays · 19:00–20:30', 8, true, 60)
on conflict (slug) do update set
  category = excluded.category,
  title_de = excluded.title_de,
  title_en = excluded.title_en,
  description_de = excluded.description_de,
  description_en = excluded.description_en,
  image_path = excluded.image_path,
  price_cents = excluded.price_cents,
  price_prefix_de = excluded.price_prefix_de,
  price_prefix_en = excluded.price_prefix_en,
  format_de = excluded.format_de,
  format_en = excluded.format_en,
  duration_weeks = excluded.duration_weeks,
  start_date = excluded.start_date,
  schedule_de = excluded.schedule_de,
  schedule_en = excluded.schedule_en,
  seats_available = excluded.seats_available,
  visible = excluded.visible,
  sort_order = excluded.sort_order;
