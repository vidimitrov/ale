/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#86EFAC", // Light Green (green-300)
          DEFAULT: "#22C55E", // Green (green-500)
          dark: "#15803D", // Dark Green (green-700)
        },
        secondary: {
          light: "#E0F2F1", // Light Teal
          DEFAULT: "#008080", // Teal
          dark: "#004D40", // Dark Teal
        },
      },
    },
  },
  plugins: [],
};
