import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { ink: "#111827", cobalt: "#2457F5", mist: "#F5F7FA", lime: "#D7FF3F" }, boxShadow: { float: "0 24px 70px rgba(30,41,59,.12)" } } }, plugins: [] } satisfies Config;
