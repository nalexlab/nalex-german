import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteStructuredData } from "@/components/StructuredData";
export const metadata: Metadata = { title: { default: "NALEX LAB", template: "%s | NALEX LAB" }, description: "Specialised online German formats for A2 refreshers, B1 conversation and technical communication at B2+.", metadataBase: new URL("https://www.nalex-german.de") };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const pathname = (await headers()).get("x-nalex-pathname") ?? "/"; const german = pathname === "/de" || pathname.startsWith("/de/") || ["/impressum", "/datenschutz", "/agb", "/widerruf", "/cookies"].includes(pathname); return <html lang={german ? "de" : "en"}><body><SiteStructuredData />{children}</body></html>; }
