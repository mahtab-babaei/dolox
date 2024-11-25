/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        base: "864px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#BC1526",
        secondary: "#FA4505",
        accent: "#0F141E",
        "accent-light": "#222732",
        neutral: "#EFF3FA",
        "base-100": "#0F141E",
        "base-200": "#EFF3FA",
        "base-300": "#F6F6F6",
        "base-content": "#8B7676",
        warning: "#e2d562",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // Disable DaisyUI themes
  },
};
