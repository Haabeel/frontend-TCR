import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1E1E1E",
        darkNavbarBackground: "#292929",
        darkMainText: "#FFFFFF",
        darkParaText: "#B0B0B0",
        darkButtons: "#D4AF37",
        darkForms: "#333333",
        darkSidebarBackground: "#232323",
        darkAdditionalFields: "#181818",
        darkPrimary: "#D4AF37",
        darkSecondary: "#333333",
        darkAccent: "#B0B0B0",
        lightBackground: "#f5f5f5",
        lightNavbarBackground: "#d8d8d8",
        lightMainText: "#333333",
        lightParaText: "#777777",
        lightButtons: "#D4AF37",
        lightForms: "#F0F0F0",
        lightSidebarBackground: "#EAEAEA",
        lightAdditionalFields: "#DDDDDD",
        lightPrimary: "#4C3E10",
        lightSecondary: "#c0c0c0",
        lightAccent: "#606060",
      },
    },
  },
  plugins: [],
};
export default config;
