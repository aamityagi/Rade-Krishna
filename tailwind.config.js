/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6750A4", // M3 Primary (Indigo-like)
          light: "#D0BCFF",
          dark: "#381E72",
        },
        secondary: {
          DEFAULT: "#625B71",
          light: "#CCC2DC",
          dark: "#332D41",
        },
        background: "#FFFBFE",
        surface: "#FFFBFE",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
