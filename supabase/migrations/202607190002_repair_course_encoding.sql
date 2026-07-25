-- Repair legacy text that was decoded with Windows-1252 instead of UTF-8.
-- Only values containing common mojibake lead bytes are converted.
update public.courses
set
  category = case when strpos(category, chr(194)) > 0 or strpos(category, chr(195)) > 0 or strpos(category, chr(226)) > 0 then convert_from(convert_to(category, 'WIN1252'), 'UTF8') else category end,
  title_de = case when strpos(title_de, chr(194)) > 0 or strpos(title_de, chr(195)) > 0 or strpos(title_de, chr(226)) > 0 then convert_from(convert_to(title_de, 'WIN1252'), 'UTF8') else title_de end,
  title_en = case when strpos(title_en, chr(194)) > 0 or strpos(title_en, chr(195)) > 0 or strpos(title_en, chr(226)) > 0 then convert_from(convert_to(title_en, 'WIN1252'), 'UTF8') else title_en end,
  description_de = case when strpos(description_de, chr(194)) > 0 or strpos(description_de, chr(195)) > 0 or strpos(description_de, chr(226)) > 0 then convert_from(convert_to(description_de, 'WIN1252'), 'UTF8') else description_de end,
  description_en = case when strpos(description_en, chr(194)) > 0 or strpos(description_en, chr(195)) > 0 or strpos(description_en, chr(226)) > 0 then convert_from(convert_to(description_en, 'WIN1252'), 'UTF8') else description_en end,
  schedule_de = case when strpos(schedule_de, chr(194)) > 0 or strpos(schedule_de, chr(195)) > 0 or strpos(schedule_de, chr(226)) > 0 then convert_from(convert_to(schedule_de, 'WIN1252'), 'UTF8') else schedule_de end,
  schedule_en = case when strpos(schedule_en, chr(194)) > 0 or strpos(schedule_en, chr(195)) > 0 or strpos(schedule_en, chr(226)) > 0 then convert_from(convert_to(schedule_en, 'WIN1252'), 'UTF8') else schedule_en end;
