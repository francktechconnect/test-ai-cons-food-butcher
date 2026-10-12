import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      gold: { 50: "#FFF9E6", 100: "#FFF0BE", 200: "#F4DB90", 300: "#ECC765", 400: "#DDB04B", 500: "#C89B35", 600: "#AC7F22", 700: "#8D651A", 800: "#6E4F17" },
      navy: { 950: "#0A172B", 900: "#10223D", 850: "#162F4C", 800: "#1C3958", 700: "#295277" },
      cream: "#F8F6F0", ink: "#18263A", muted: "#718097"
    },
    boxShadow: { soft: "0 8px 34px rgba(15, 34, 60, 0.055)", glow: "0 13px 32px rgba(200,155,53,.20)" },
    borderRadius: { xl2: "1.125rem" }
  }}, plugins: []
};
export default config;
