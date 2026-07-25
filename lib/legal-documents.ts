import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";

export type LegalLocale = "de" | "en";

export const getLegalDocument = cache(async (document:string, locale:LegalLocale) => {
  const source = await readFile(path.join(process.cwd(), "content", "legal", `${document}.${locale}.md`), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { title: "", eyebrow: "", content: source };
  const metadata = Object.fromEntries(match[1].split("\n").map(line => {
    const [key, ...value] = line.split(":");
    return [key.trim(), value.join(":").trim()];
  }));
  return { title: metadata.title ?? "", eyebrow: metadata.eyebrow ?? "", content: match[2] };
});
