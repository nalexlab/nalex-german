import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteStructuredData } from "@/components/StructuredData";
export const metadata: Metadata = { title: { default: "NALEX LAB", template: "%s | NALEX LAB" }, description: "Story-based online German courses for adults, professionals and international teams.", metadataBase: new URL("https://nalex-german.de") };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const pathname = (await headers()).get("x-nalex-pathname") ?? "/"; const german = pathname === "/de" || pathname.startsWith("/de/") || ["/impressum", "/datenschutz", "/agb", "/widerruf", "/cookies"].includes(pathname); return <html lang={german ? "de" : "en"}><body><SiteStructuredData />{children}</body></html>; }
