alter table public.courses
  add column if not exists main_category text,
  add column if not exists subcategory text;

-- Preserve every existing course value. These updates add only the new routing
-- metadata for rows whose current category/title already identifies a hierarchy.
update public.courses
set main_category = 'german-courses', subcategory = 'a1'
where main_category is null and category = 'A1';

update public.courses
set main_category = 'german-courses', subcategory = 'a2'
where main_category is null and category = 'A2';

update public.courses
set main_category = 'german-courses', subcategory = 'b1-b2'
where main_category is null and category in ('B1–B2', 'B1â€“B2');

update public.courses
set main_category = 'professional-german', subcategory = 'business-german'
where main_category is null
  and (slug ilike '%business-german%' or title_en ilike '%business german%');

update public.courses
set main_category = 'professional-german', subcategory = 'technical-german'
where main_category is null
  and (slug ilike '%technical-german%' or title_en ilike '%technical german%');

update public.courses
set main_category = 'reading-club', subcategory = 'b1-b2'
where main_category is null
  and (slug ilike '%reading-club%' or title_en ilike '%reading club%');

create index if not exists courses_visible_hierarchy_idx
  on public.courses (main_category, subcategory, sort_order, start_date)
  where visible = true;
