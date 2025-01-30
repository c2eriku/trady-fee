import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          50: "#F6F0EA",
          100: "#EDE0D4",
          200: "#D6BFA6",
          300: "#C0A181",
          400: "#AD8767",
          500: "#A27B5C", // 主色
          600: "#8B6549",
          700: "#6E4E39",
          800: "#523A2A",
          900: "#39281D",
        },
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
