/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // if using /app directly
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // if using /components directly
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6750A4",
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
